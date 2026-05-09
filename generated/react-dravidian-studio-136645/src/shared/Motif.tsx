type Props = {
  name: string
  className?: string
  width?: number | string
  height?: number | string
  style?: React.CSSProperties
}

export default function Motif({ name, className, width, height, style }: Props) {
  // Build-time post-process replaces these with inlined SVG. If you see this
  // text in a rendered page, the post-process didn't run.
  return (
    <span
      className={className}
      style={{ display: 'inline-block', width, height, ...style }}
      data-motif={name}
    >
      [motif: {name}]
    </span>
  )
}
