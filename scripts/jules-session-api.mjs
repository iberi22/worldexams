#!/usr/bin/env node
/**
 * Jules Session API Client
 * Facilitates direct communication with Jules tasks, retrieving activities,
 * sending corrective messages to stuck/failed sessions, and approving plans.
 * 
 * Usage:
 *   node scripts/jules-session-api.mjs list
 *   node scripts/jules-session-api.mjs get <sessionId>
 *   node scripts/jules-session-api.mjs activities <sessionId>
 *   node scripts/jules-session-api.mjs reply <sessionId> "<message>"
 *   node scripts/jules-session-api.mjs approve <sessionId>
 */

import fs from 'fs';
import path from 'path';

const JULES_API_URL = 'https://jules.googleapis.com/v1alpha';
const API_KEY = process.env.JULES_API_KEY || process.env.GEMINI_API_KEY;

function getHeaders() {
  if (!API_KEY) {
    console.error('❌ Error: Neither JULES_API_KEY nor GEMINI_API_KEY is set in environment.');
    console.error('Please export JULES_API_KEY="<your-google-jules-api-key>"');
    process.exit(1);
  }
  return {
    'X-Goog-Api-Key': API_KEY,
    'Content-Type': 'application/json'
  };
}

async function request(endpoint, method = 'GET', body = null) {
  const url = `${JULES_API_URL}/${endpoint}`;
  const options = {
    method,
    headers: getHeaders()
  };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);
  const json = await res.json();
  if (!res.ok) {
    console.error(`❌ HTTP Error ${res.status}:`, json);
    throw new Error(`Jules API request failed: ${res.statusText}`);
  }
  return json;
}

const [,, action, targetSessionId, ...extraArgs] = process.argv;

async function main() {
  switch (action) {
    case 'list': {
      console.log('📋 Fetching recent Jules sessions...');
      const data = await request('sessions?pageSize=20');
      console.log(JSON.stringify(data.sessions || [], null, 2));
      break;
    }

    case 'get': {
      if (!targetSessionId) {
        console.error('Usage: node scripts/jules-session-api.mjs get <sessionId>');
        process.exit(1);
      }
      console.log(`🔍 Fetching details for session ${targetSessionId}...`);
      const data = await request(`sessions/${targetSessionId}`);
      console.log(JSON.stringify(data, null, 2));
      break;
    }

    case 'activities': {
      if (!targetSessionId) {
        console.error('Usage: node scripts/jules-session-api.mjs activities <sessionId>');
        process.exit(1);
      }
      console.log(`📝 Fetching activities for session ${targetSessionId}...`);
      const data = await request(`sessions/${targetSessionId}/activities?pageSize=50`);
      console.log(JSON.stringify(data.activities || [], null, 2));
      break;
    }

    case 'reply':
    case 'message': {
      if (!targetSessionId) {
        console.error('Usage: node scripts/jules-session-api.mjs reply <sessionId> "<message>"');
        process.exit(1);
      }
      const message = extraArgs.join(' ');
      if (!message) {
        console.error('❌ Error: Message text is required.');
        process.exit(1);
      }
      console.log(`💬 Sending corrective message to Jules session ${targetSessionId}...`);
      const res = await request(`sessions/${targetSessionId}:sendMessage`, 'POST', { prompt: message });
      console.log('✅ Message delivered successfully:', res);
      break;
    }

    case 'approve': {
      if (!targetSessionId) {
        console.error('Usage: node scripts/jules-session-api.mjs approve <sessionId>');
        process.exit(1);
      }
      console.log(`✅ Approving plan for session ${targetSessionId}...`);
      const res = await request(`sessions/${targetSessionId}:approvePlan`, 'POST', {});
      console.log('✅ Plan approved successfully:', res);
      break;
    }

    default:
      console.log(`
Jules Session API CLI
Commands:
  list                        List recent sessions
  get <sessionId>             Get session details
  activities <sessionId>      Get session activity log & error stack
  reply <sessionId> "<msg>"   Send message / instruction to a Jules session
  approve <sessionId>         Approve generated plan for a session
      `);
  }
}

main().catch(err => {
  console.error('Fatal Error:', err.message);
  process.exit(1);
});
