"use client";

interface AdsterraBannerProps {
  /** The Adsterra ad unit key from your dashboard (the long hex string in atOptions.key). */
  adKey: string;
  width: number;
  height: number;
  /** The invoke.js host Adsterra gave you for this unit — varies per ad format/account. */
  scriptHost?: string;
  className?: string;
}

/**
 * Renders an Adsterra "Banner" format ad unit.
 *
 * Adsterra's invoke.js relies on `document.write`, which is unsafe to run
 * directly inside a React-managed DOM (it can wipe the page if called after
 * load). Loading it inside an `iframe srcDoc` gives the script its own,
 * fully isolated document to write into — the standard safe pattern for
 * embedding document.write-based ad tags in a React/Next.js app.
 */
export function AdsterraBanner({
  adKey,
  width,
  height,
  scriptHost = "https://www.highperformanceformat.com",
  className,
}: AdsterraBannerProps) {
  const srcDoc = `<!DOCTYPE html><html><head><style>html,body{margin:0;padding:0;overflow:hidden;}</style></head><body>
<script type="text/javascript">
  atOptions = {
    'key' : '${adKey}',
    'format' : 'iframe',
    'height' : ${height},
    'width' : ${width},
    'params' : {}
  };
</script>
<script type="text/javascript" src="${scriptHost}/${adKey}/invoke.js"></script>
</body></html>`;

  return (
    <iframe
      srcDoc={srcDoc}
      width={width}
      height={height}
      style={{ border: 0, overflow: "hidden", display: "block" }}
      scrolling="no"
      title="Advertisement"
      className={className}
    />
  );
}
