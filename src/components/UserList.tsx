import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Box, Divider, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Loader from "./Loader";

interface User {
    id: number;
    email: string;
    gender: string;
    status: string;
    name: string;
}

interface UserRowProps {
    user: User;
    onClick: () => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, onClick }) => {
    const { id, name, email, gender, status } = user;
    const navigate = useNavigate();

    return (
        <TableRow key={id} sx={{ '&:hover': { backgroundColor: '#fafafa' }, cursor: 'pointer' }} onClick={onClick}>
            <TableCell><Link component="button">{name}</Link></TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{gender}</TableCell>
            <TableCell sx={{ color: status === "active" ? '#1b5e20' : '#f44336' }}>{status}</TableCell>
        </TableRow>
    );
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await axios.get("https://gorest.co.in/public/v1/users");
            setUsers(response.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <Paper square sx={{ p: 2, m: 3, height: '85vh', overflow: 'auto' }}>
            <Stack spacing={3}>
                <Typography variant='h4'>Users</Typography>
                <Divider />
                {loading ? <Loader /> :
                    <TableContainer>
                        <Table stickyHeader sx={{ border: '1px dotted black', '.css-iddkgx-MuiTableCell-root': { fontSize: 12 } }}>
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell>ID</TableCell> */}
                                    <TableCell sx={{ backgroundColor: '#eeeeee' }}>NAME</TableCell>
                                    <TableCell sx={{ backgroundColor: '#eeeeee' }}>EMAIL</TableCell>
                                    <TableCell sx={{ backgroundColor: '#eeeeee' }}>GENDER</TableCell>
                                    <TableCell sx={{ backgroundColor: '#eeeeee' }}>STATUS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <UserRow
                                        key={user.id}
                                        user={user}
                                        onClick={() => navigate("/posts", { state: { userId: user.id } })}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </Stack>
        </Paper>
    )
}

export default UserList;
