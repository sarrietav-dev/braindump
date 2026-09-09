import type { SocialImageOptions } from "@quartz-community/og-image"
import type { GlobalConfiguration } from "../../cfg"

export const createOgImage: SocialImageOptions["imageStructure"] = ({
  cfg,
  userOpts,
  title,
  description,
}) => {
  const quartzCfg = cfg as unknown as GlobalConfiguration
  const { colorScheme } = userOpts
  const fontBreakPoint = 32
  const useSmallerFont = title.length > fontBreakPoint
  const iconPath = `https://${quartzCfg.baseUrl}/static/icon.svg`
  const titleFont = quartzCfg.theme.typography.header.toString()
  const descriptionFont = quartzCfg.theme.typography.body.toString()

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        backgroundColor: quartzCfg.theme.colors[colorScheme].light,
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
            color: quartzCfg.theme.colors[colorScheme].dark,
            fontSize: useSmallerFont ? 70 : 82,
            fontFamily: titleFont,
          }}
        >
          {title}
        </p>
      </div>
      <p
        style={{
          color: quartzCfg.theme.colors[colorScheme].dark,
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
