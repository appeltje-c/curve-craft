import { Card, CardContent, Typography } from "@mui/material"
import { Vector3 } from "three"

export default function View({ points }: { points: Vector3[] }) {

    if (!points) return

    return (
        <Card elevation={3} sx={{ position: 'absolute', top: 10, left: 10, zIndex: 10000 }}>
            <CardContent>
                {
                    points?.map((point, index) => (
                        <Typography key={`key-${index}`} fontFamily={'monospace'} fontSize={12}>
                            {`new Vector3(${point.x},${point.y},${point.z})`}
                        </Typography>
                    ))
                }
            </CardContent>
        </Card>
    )
}