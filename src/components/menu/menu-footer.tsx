import Grid from "@mui/material/Grid2"
import StyledItem from "./styled-item"
import { IconButton } from "@mui/material"
import GitHubIcon from '@mui/icons-material/GitHub'
import InfoIcon from '@mui/icons-material/Info'
import Info from "./info"
import { useState } from "react"

export default function MenuFooter() {

    const [open, setOpen] = useState(false)

    return (
        <Grid size={12} style={{ paddingBottom: 10, paddingTop: 10 }}>
            <StyledItem>
                <IconButton onClick={() => window.open('https://github.com/appeltje-c/curvature', '_blank')}>
                    <GitHubIcon />
                </IconButton>
                <IconButton onClick={() => setOpen(true)}>
                    <InfoIcon />
                </IconButton>
            </StyledItem>
            <Info open={open} setOpen={setOpen} />
        </Grid>
    )
}