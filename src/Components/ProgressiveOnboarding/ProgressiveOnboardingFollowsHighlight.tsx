import { useProgressiveOnboarding } from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowArtist"
import { ProgressiveOnboardingHighlight } from "Components/ProgressiveOnboarding/ProgressiveOnboardingHighlight"
import { FC, useEffect } from "react"

export const PROGRESSIVE_ONBOARDING_FOLLOWS_HIGHLIGHT = "follows-highlight"

export const ProgressiveOnboardingFollowsHighlight: FC = ({ children }) => {
  const { isDismissed, dismiss, enabled } = useProgressiveOnboarding()

  useEffect(() => {
    if (!enabled) return
    if (isDismissed(PROGRESSIVE_ONBOARDING_FOLLOWS_HIGHLIGHT)) return

    const handleClick = () => {
      dismiss(PROGRESSIVE_ONBOARDING_FOLLOWS_HIGHLIGHT)
    }

    document.addEventListener("click", handleClick, { once: true })

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [dismiss, enabled, isDismissed])

  if (
    !enabled ||
    // If you've already dismissed this
    isDismissed(PROGRESSIVE_ONBOARDING_FOLLOWS_HIGHLIGHT) ||
    // Or you haven't yet dismissed the follow artist step
    !isDismissed(PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST)
  ) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingHighlight>{children}</ProgressiveOnboardingHighlight>
  )
}
