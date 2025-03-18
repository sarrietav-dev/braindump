import { SocialImageOptions } from "../../util/og"

export const createOgImage: SocialImageOptions["imageStructure"] = ({
  cfg,
  userOpts,
  title,
  description,
  fileData,
  iconBase64,
}) => {
  const { colorScheme } = userOpts
  const fontBreakPoint = 32
  const useSmallerFont = title.length > fontBreakPoint
  const iconPath = `https://${cfg.baseUrl}/static/icon.svg`
  const titleFont = cfg.theme.typography.header.toString()
  const descriptionFont = cfg.theme.typography.body.toString()

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        backgroundColor: cfg.theme.colors[colorScheme].light,
        gap: "2rem",
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
        paddingLeft: "5rem",
        paddingRight: "5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          flexDirection: "row",
          gap: "2.5rem",
        }}
      >
        <img src={iconPath} width={135} height={135} />
        <p
          style={{
            color: cfg.theme.colors[colorScheme].dark,
            fontSize: useSmallerFont ? 70 : 82,
            fontFamily: titleFont,
          }}
        >
          {title}
        </p>
      </div>
      <p
        style={{
          color: cfg.theme.colors[colorScheme].dark,
          fontSize: 44,
          lineClamp: 3,
          fontFamily: descriptionFont,
        }}
      >
        {description}
      </p>
    </div>
  )
}
