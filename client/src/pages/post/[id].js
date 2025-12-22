import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
 import { getPost } from '../../redux/actions/postAction';
import UserPosts from '../../components/UserPosts';
 
 
import SimilarPosts from '../../components/SimilarPosts';
import DetailPostCard from '../../components/DetailPostCard';

const DetailPost = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentPost, loading } = useSelector(state => state.post);
    
    useEffect(() => {
        if (id) {
            console.log('📥 Cargando post con ID:', id);
            dispatch(getPost(id));
        }
    }, [dispatch, id]);
    
    if (loading) {
        return (
            <Container className="text-center py-5">
                <div className="spinner-border text-primary"></div>
                <p className="mt-2">Cargando anuncio...</p>
            </Container>
        );
    }
    
    if (!currentPost) {
        return (
            <Container className="text-center py-5">
                <h4>Anuncio no encontrado</h4>
                <p>El anuncio que buscas no existe o ha sido eliminado.</p>
            </Container>
        );
    }
    
    console.log('📊 Post cargado para Detail:', {
        id: currentPost._id,
        categorie: currentPost.categorie,
        hasImages: currentPost.images?.length
    });
    
    return (
        <Container className="py-4">
            {/* Post principal */}
            <Row className="mb-5">
                <Col lg={8}>
                    <DetailPostCard post={currentPost} />
                </Col>
                <Col lg={4}>
                    <UserPosts 
                        userId={currentPost.user?._id}
                        excludePostId={currentPost._id}
                        limit={4}
                    />
                </Col>
            </Row>
            
            {/* Posts similares - Usamos el COMPONENTE que creamos */}
            <SimilarPosts currentPost={currentPost} />
        </Container>
    );
};

export default DetailPost;