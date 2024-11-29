import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Grid, TextField } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const nav = useNavigate();

    const deleteArticles = (stdid) => {
        console.log("document ID to delete:", stdid);

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this action!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('http://localhost:8888/admin/deleteari', {
                    id: stdid,
                }).then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Document has been deleted.',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        // Update the local state by filtering out the deleted document
                        setArticles(prevArticles => prevArticles.filter(ari => ari.id !== stdid));
                        nav('/viewarticle'); // Optional: Navigate if needed
                    });

                }).catch(error => {
                    if (error.response && error.response.status === 409) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'The document cannot be deleted because it has associated records.',
                            confirmButtonText: 'OK'
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Could not delete the document!',
                            confirmButtonText: 'OK'
                        });
                    }
                });
            } else {
                Swal.fire({
                    title: 'Cancelled',
                    text: 'Your deletion has been cancelled!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    };

    useEffect(() => {
        loadArticles();
    }, []);

    const loadArticles = async () => {
        const result = await axios.post("http://localhost:8888/admin/getall");
        console.log("list article", result)
        setArticles(result.data);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ color: '#1976d2' }}>Articles List</h2>
            <Button
                variant="contained"
                color="primary"
                startIcon={<FaPlus />}
                component={Link}
                to="/add"
                style={{ marginBottom: '20px' }}
            >
                Add New Article
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Title</strong></TableCell>
                            <TableCell><strong>Category</strong></TableCell>
                            <TableCell><strong>Createat</strong></TableCell>
                            <TableCell><strong>Updateat</strong></TableCell>
                            <TableCell><strong>Published</strong></TableCell>
                            <TableCell><strong>NameFile</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {articles.map(article => (
                            <TableRow key={article.Articlesid}>
                                <TableCell>{article.Articlesid}</TableCell>
                                <TableCell>{article.Title}</TableCell>
                                <TableCell>{article.Category}</TableCell>
                                <TableCell>{article.Createat}</TableCell>
                                <TableCell>{article.Updateat}</TableCell>
                                <TableCell>{article.Published}</TableCell>
                                <TableCell>{article.Namefile}</TableCell>

                                <TableCell>
                                    <IconButton component={Link} to={'/edit/${article.articlesid}'} color="primary">
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => deleteArticles(article.Articlesid)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
const CreateArticle = () => {
    const [article, setArticle] = useState({
        title: "",
        content: "",
        category: "",
        createAt: new Date().toISOString().slice(11, 19),
        updateAt: new Date().toISOString().slice(11, 19),
        published: "",
        nameFile: "",
        dateUp: new Date().toISOString().slice(0, 10),
        teacherteachingserviceID: "", // foreign key
    });

    const handleChange = (e) => {
        setArticle({
            ...article,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8888/admin/create", article)
            .then((response) => {
                if (!article.title || !article.content || !article.category || !article.published || !article.nameFile || !article.teacherteachingserviceID)
                    console.log("Article created:", response.data);
                alert('bản tin đẫ được tạo!');
                setArticle({
                    title: "",
                    content: "",
                    category: "",
                    createAt: new Date().toISOString().slice(11, 19),
                    updateAt: new Date().toISOString().slice(11, 19),
                    published: "",
                    nameFile: "",
                    dateUp: new Date().toISOString().slice(0, 10),
                    teacherteachingserviceID: ""
                })
                // Handle successful creation (e.g., reset form, show success message)
            })
            .catch((error) => {
                console.error("There was an error creating the article!", error);
            });
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={article.title}
                onChange={handleChange}
            />
            <textarea
                name="content"
                placeholder="Content"
                value={article.content}
                onChange={handleChange}
            ></textarea>
            <input
                type="text"
                name="category"
                placeholder="Category"
                value={article.category}
                onChange={handleChange}
            />
            <input
                type="text"
                name="published"
                placeholder="Published"
                value={article.published}
                onChange={handleChange}
            />
            <input
                type="text"
                name="nameFile"
                placeholder="Name File"
                value={article.nameFile}
                onChange={handleChange}
            />
            {/* <input
                type="date"
                name="dateUp"
                value={article.dateUp}
                onChange={handleChange}
            /> */}
            <input
                type="number"
                name="teacherteachingserviceID"
                placeholder="Teacher Teaching Service ID"
                value={article.teacherteachingserviceID}
                onChange={handleChange}
            />
            <button type="submit">Create Article</button>
        </form>
    );
};

const EditArticle = () => {
    const { id } = useParams();
    const [article, setArticle] = useState({});
    const navigate = useNavigate();

    //     useEffect(() => {
    //         articleService.getArticleById(id).then((response) => {
    //             setArticle(response.data);
    //         });
    //     }, [id]);

    //    
    useEffect(() => {
        loadArticles();
    }, []);

    const loadArticles = async () => {
        const result = await axios.get(`http://localhost:8888/admin/articles/${id}`);
        setArticle(result.data);
    };

    const onInputChange = e => {
        setArticle({ ...article, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        await axios.put('http://localhost:8888/admin/articles/${id}', article);
        navigate("/");
    };
    const updateArticle = async e => {
        e.preventDefault();
        await axios.post("http://localhost:8888/admin/articles");
        navigate('/');

    };
    return (
        <Paper style={{ padding: '20px', marginTop: '20px' }}>
            <h2 style={{ color: '#1976d2' }}>Edit Article</h2>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        label="Title"
                        fullWidth
                        value={article.title || ''}
                        onChange={e => setArticle({ ...article, title: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Content"
                        fullWidth
                        multiline
                        rows={4}
                        value={article.content || ''}
                        onChange={e => setArticle({ ...article, content: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Category"
                        fullWidth
                        value={article.category || ''}
                        onChange={e => setArticle({ ...article, category: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Published"
                        fullWidth
                        value={article.published || ''}
                        onChange={e => setArticle({ ...article, published: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Namefile"
                        fullWidth
                        value={article.namefile || ''}
                        onChange={e => setArticle({ ...article, namefile: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={updateArticle}
                        fullWidth
                    >
                        Update Article
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export { ArticleList, CreateArticle, EditArticle };
