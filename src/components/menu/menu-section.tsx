import Grid from "@mui/material/Grid2"
import MenuItem from "./menu-item"


export default function MenuSection({ text }: { text: string }) {

    return (
        <Grid size={12} style={{ paddingBottom: 10 }}>
            <MenuItem>{text}</MenuItem>
        </Grid>
    )
}