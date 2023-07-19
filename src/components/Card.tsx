import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface CardProps {
    card: {
        id: number;
        title: string;
        body: string;
    };
}

const BasicCard: React.FC<CardProps> = ({ card }) => {
    const { id, title, body } = card;
    
    return (
        <Card sx={{ minWidth: 345, p: 1 }}>
            <CardContent>
                <Typography fontSize={14} fontWeight={600} gutterBottom>
                    {title}
                </Typography>
                <Typography sx={{ fontSize: 13 }} color="text.secondary">
                    {body}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button size="small" variant='contained' sx={{ borderRadius: '16px' }}>View Details</Button>
            </CardActions>
        </Card>
    );
}

export default BasicCard;
