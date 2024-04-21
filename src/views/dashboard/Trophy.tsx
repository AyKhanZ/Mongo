// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import Dashboard from '@/pages/dashboard'
import DashboardCard from '@/components/shared/DashboardCard'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const Trophy = () => {
  // ** Hook
  const theme = useTheme()

  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <DashboardCard >
      <CardContent>
        <Typography variant='h6'>Congratulations! 🥳</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          Best seller of the month
        </Typography>
        <Typography variant='h5' sx={{ my: 4, color: 'success.dark' }}>
          $42.8k
        </Typography>
        <Button color='success' size='small' variant='contained'>
          View Sales
        </Button>
      </CardContent>
    </DashboardCard>
  )
}

export default Trophy
