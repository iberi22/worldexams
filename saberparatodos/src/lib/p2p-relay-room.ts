/**
 * Relay Room implementation using hive-relay and native WebRTC
 *
 * Mimics Trystero room interface to allow easy fallback in P2PService.
 */

import { RelayClient, type SignalMessage } from './p2p-relay-client';

export class RelayRoom {
  private client: RelayClient;
  private peerConnections: Map<string, RTCPeerConnection> = new Map();
  private dataChannels: Map<string, RTCDataChannel> = new Map();
  private actions: Map<string, Set<(data: any, peerId: string) => void>> = new Map();
  private joinCallbacks: Set<(peerId: string) => void> = new Set();
  private leaveCallbacks: Set<(peerId: string) => void> = new Set();
  private rtcConfig: RTCConfiguration;
  private myPeerId: string = '';

  constructor(rtcConfig: RTCConfiguration) {
    this.rtcConfig = rtcConfig;
    this.client = new RelayClient(this.handleSignal.bind(this));
  }

  async join(roomCode: string, peerId: string): Promise<void> {
    this.myPeerId = peerId;
    await this.client.connect(roomCode, peerId);
  }

  makeAction(type: string): [any, any] {
    if (!this.actions.has(type)) {
      this.actions.set(type, new Set());
    }

    const send = (data: any, peerId?: string) => {
      const payload = JSON.stringify({ type, data });
      if (peerId) {
        this.dataChannels.get(peerId)?.send(payload);
      } else {
        this.dataChannels.forEach(channel => {
          if (channel.readyState === 'open') {
            channel.send(payload);
          }
        });
      }
    };

    const get = (callback: (data: any, peerId: string) => void) => {
      this.actions.get(type)?.add(callback);
    };

    return [send, get];
  }

  onPeerJoin(callback: (peerId: string) => void) {
    this.joinCallbacks.add(callback);
  }

  onPeerLeave(callback: (peerId: string) => void) {
    this.leaveCallbacks.add(callback);
  }

  leave() {
    this.client.disconnect();
    this.dataChannels.forEach(c => c.close());
    this.peerConnections.forEach(pc => pc.close());
    this.dataChannels.clear();
    this.peerConnections.clear();
  }

  private async handleSignal(msg: SignalMessage) {
    switch (msg.type) {
      case 'peer_joined':
        if (msg.peer_id) this.initiateConnection(msg.peer_id);
        break;
      case 'offer':
        if (msg.peer_id && msg.sdp) this.handleOffer(msg.peer_id, msg.sdp);
        break;
      case 'answer':
        if (msg.peer_id && msg.sdp) this.handleAnswer(msg.peer_id, msg.sdp);
        break;
      case 'ice':
        if (msg.peer_id && msg.candidate) this.handleIceCandidate(msg.peer_id, msg.candidate);
        break;
      case 'peer_left':
        if (msg.peer_id) this.cleanupPeer(msg.peer_id);
        break;
      case 'room_info':
        msg.peers?.forEach(pid => {
          if (pid !== this.myPeerId) this.initiateConnection(pid);
        });
        break;
    }
  }

  private async initiateConnection(peerId: string) {
    if (this.peerConnections.has(peerId)) return;

    const pc = this.createPeerConnection(peerId);
    const dc = pc.createDataChannel('data');
    this.setupDataChannel(peerId, dc);

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    this.client.send({
      type: 'offer',
      to: peerId,
      peer_id: this.myPeerId,
      sdp: offer.sdp
    });
  }

  private async handleOffer(peerId: string, sdp: string) {
    const pc = this.createPeerConnection(peerId);
    await pc.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp }));

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    this.client.send({
      type: 'answer',
      to: peerId,
      peer_id: this.myPeerId,
      sdp: answer.sdp
    });
  }

  private async handleAnswer(peerId: string, sdp: string) {
    const pc = this.peerConnections.get(peerId);
    if (pc) {
      await pc.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp }));
    }
  }

  private async handleIceCandidate(peerId: string, candidate: string) {
    const pc = this.peerConnections.get(peerId);
    if (pc) {
      await pc.addIceCandidate(new RTCIceCandidate(JSON.parse(candidate)));
    }
  }

  private createPeerConnection(peerId: string): RTCPeerConnection {
    const pc = new RTCPeerConnection(this.rtcConfig);
    this.peerConnections.set(peerId, pc);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.client.send({
          type: 'ice',
          to: peerId,
          peer_id: this.myPeerId,
          candidate: JSON.stringify(event.candidate)
        });
      }
    };

    pc.ondatachannel = (event) => {
      this.setupDataChannel(peerId, event.channel);
    };

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed' || pc.connectionState === 'closed') {
        this.cleanupPeer(peerId);
      }
    };

    return pc;
  }

  private setupDataChannel(peerId: string, dc: RTCDataChannel) {
    this.dataChannels.set(peerId, dc);

    dc.onopen = () => {
      console.log(`📡 P2P: Channel with ${peerId} opened`);
      this.joinCallbacks.forEach(cb => cb(peerId));
    };

    dc.onclose = () => {
      console.log(`📡 P2P: Channel with ${peerId} closed`);
      this.cleanupPeer(peerId);
    };

    dc.onmessage = (event) => {
      try {
        const { type, data } = JSON.parse(event.data);
        this.actions.get(type)?.forEach(cb => cb(data, peerId));
      } catch (e) {
        console.error('📡 P2P: Failed to handle data channel message', e);
      }
    };
  }

  private cleanupPeer(peerId: string) {
    this.dataChannels.get(peerId)?.close();
    this.peerConnections.get(peerId)?.close();
    this.dataChannels.delete(peerId);
    this.peerConnections.delete(peerId);
    this.leaveCallbacks.forEach(cb => cb(peerId));
  }
}
