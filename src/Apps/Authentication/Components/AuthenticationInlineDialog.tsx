import { Box, Flex, Join, Spacer, Text, useToasts } from "@artsy/palette"
import { AuthDialogView } from "Components/AuthDialog/AuthDialog"
import { FC, useEffect } from "react"
import { useRecaptcha } from "Utils/EnableRecaptcha"
import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"
import { useAuthDialogOptions } from "Apps/Authentication/Hooks/useAuthDialogOptions"
import { MetaTags } from "Components/MetaTags"
import { AuthenticationInlineDialogProvider } from "Apps/Authentication/Components/AuthenticationInlineDialogProvider"
import { AuthDialogMode } from "Components/AuthDialog/AuthDialogContext"
import { useRouter } from "System/Router/useRouter"

const AuthenticationInlineDialogContents: FC = () => {
  useRecaptcha()

  const { title, pageTitle, description } = useAuthDialogOptions()

  const { sendToast } = useToasts()

  const {
    match: { location },
  } = useRouter()

  // Errors might come back from 3rd party authentication
  // as a string in an `error` query param, so display them if present.
  useEffect(() => {
    if (!location.query.error) return

    sendToast({
      message: location.query.error,
      variant: "error",
      ttl: Infinity,
    })
  }, [location.query.error, sendToast])

  return (
    <>
      <MetaTags title={pageTitle} />

      <Flex
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        minHeight="100vh"
        mx="auto"
        py={4}
        maxWidth={["100%", 450]}
      >
        <Box width="100%">
          <Join separator={<Spacer y={2} />}>
            <ArtsyLogoIcon
              display="block"
              style={{ width: "75px", height: "26px" }}
            />

            <Text variant="lg-display" lineClamp={6}>
              {title}
            </Text>

            {description && (
              <Text variant="sm-display" lineClamp={6}>
                {description}
              </Text>
            )}

            <AuthDialogView />
          </Join>
        </Box>
      </Flex>
    </>
  )
}

interface AuthenticationInlineDialogProps {
  mode: AuthDialogMode
}

export const AuthenticationInlineDialog: FC<AuthenticationInlineDialogProps> = ({
  mode,
}) => {
  return (
    <AuthenticationInlineDialogProvider mode={mode}>
      <AuthenticationInlineDialogContents />
    </AuthenticationInlineDialogProvider>
  )
}
