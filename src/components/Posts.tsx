import { Box, Container, Divider, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import BasicCard from './Card';
import Loader from './Loader';

const API_BASE_URL = "https://gorest.co.in/public/v1";

interface Card {
    id: number;
    title: string;
    body: string;
}


function Posts() {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const location = useLocation();
    const { userId } = location.state || {};

    const fetchPosts = async (userId: number) => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/users/${userId}/posts`);
            setCards(response.data.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (userId) {
            fetchPosts(userId);
        }
    }, [userId])

    const renderCards = () => {
        if (loading) {
            return <Loader />;
        } else if (cards.length > 0) {
            return <Stack spacing={3}>
                {
                    cards.map((card) => (
                        <BasicCard key={card.id} card={card} />
                    ))
                }
            </Stack>;
        } else {
            return <Typography variant='h6'>No posts available</Typography>;
        }
    }

    return (
        <Container>
            <Paper square sx={{ p: 2, m: 3, height: '85vh', overflow: 'auto' }}>
                <Stack spacing={3}>
                    <Typography variant='h4'>Posts</Typography>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: 4 }}>
                        {renderCards()}
                    </Box>
                </Stack>
            </Paper>
        </Container>
    )
}

export default Posts;
