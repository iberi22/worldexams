<script lang="ts">
  interface Props {
    format?: string;
    slot?: string;
    customStyle?: string;
    className?: string;
  }

  let {
    format = 'auto',
    slot = '7015371704987876',
    customStyle = '',
    className = ''
  }: Props = $props();
</script>

<div class="ad-container {className}" style={customStyle}>
  <!-- Google AdSense Placeholder -->
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-7015371704987876"
       data-ad-slot={slot}
       data-ad-format={format}
       data-full-width-responsive="true"></ins>
  <script>
       (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
</div>

<style>
  .ad-container {
    background: rgba(255, 255, 255, 0.02);
    border: 1px dashed rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    overflow: hidden;
    min-height: 250px; /* Match card height */
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>