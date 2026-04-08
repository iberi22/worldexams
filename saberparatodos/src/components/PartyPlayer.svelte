<script lang="ts">
  import ExamRoomPlayer from './ExamRoomPlayer.svelte';

  interface Props {
    partyCode: string;
    studentName?: string;
    studentId?: string;
    autoJoin?: boolean;
    isHost?: boolean;
  }

  let {
    partyCode,
    studentName = '',
    studentId = '',
    autoJoin = false,
    isHost = false
  }: Props = $props();
</script>

<ExamRoomPlayer
  roomCode={partyCode}
  {studentName}
  {studentId}
  {autoJoin}
  {isHost}
/>
