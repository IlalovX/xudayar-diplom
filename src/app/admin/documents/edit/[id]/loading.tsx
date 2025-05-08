import { Box, CircularProgress, Typography, Paper } from "@mui/material"

export default function Loading() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress size={60} thickness={4} sx={{ mb: 2 }} />
        <Typography variant="h6">Загрузка документа...</Typography>
        <Typography variant="body2" color="text.secondary">
          Пожалуйста, подождите
        </Typography>
      </Paper>
    </Box>
  )
}
