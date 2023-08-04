import FilterIcon from "@artsy/icons/FilterIcon"
import { Box, Button, Drawer, Spacer, Text } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { FC, ReactNode, useState } from "react"

interface ArtworkFilterDrawerProps {
  children: ReactNode
}

export const ArtworkFilterDrawer: FC<ArtworkFilterDrawerProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<"Idle" | "Open">("Idle")

  return (
    <>
      <Button
        variant="tertiary"
        Icon={FilterIcon}
        size="small"
        onClick={() => {
          setMode("Open")
        }}
      >
        Sort and Filter
      </Button>

      <Drawer
        zIndex={Z.dropdown}
        open={mode === "Open"}
        onClose={() => {
          setMode("Idle")
        }}
      >
        <Box p={2}>
          <Text variant="xs">Sort & Filter</Text>

          <Spacer y={4} />

          {children}
        </Box>
      </Drawer>
    </>
  )
}
