// components/home/Posts.js - VERSIÓN MODIFICADA
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PostCard from '../postcards/PostCard'
import LoadIcon from '../../images/loading.gif'
import LoadMoreBtn from '../LoadMoreBtn'
import { getDataAPI } from '../../utils/fetchData'
import { POST_TYPES } from '../../redux/actions/postAction'
import CategorySection from './CategorySection'; // Nuevo import

const Posts = ({ viewMode, showByCategory = false }) => { // Nuevo prop
    const { homePosts, auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const [categoriesData, setCategoriesData] = useState({})
    const [loadingCategories, setLoadingCategories] = useState(false)

    // 🎯 CARGAR DATOS POR CATEGORÍA SI showByCategory es true
    useEffect(() => {
        if (showByCategory) {
            fetchCategoriesData();
        }
    }, [showByCategory]);

    const fetchCategoriesData = async () => {
        try {
            setLoadingCategories(true);
            const res = await getDataAPI('posts/home-categories?limit=6');
            if (res.data && res.data.categories) {
                setCategoriesData(res.data.categories);
            }
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoadingCategories(false);
        }
    };

    // 🔹 PAGINACIÓN
    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`posts?limit=${homePosts.page * 9}`, auth.token)

        dispatch({
            type: POST_TYPES.GET_POSTS, 
            payload: {...res.data, page: homePosts.page + 1}
        })

        setLoad(false)
    }

    // 🎯 RENDERIZAR POR CATEGORÍA
    if (showByCategory) {
        return (
            <div>
                {loadingCategories ? (
                    <div className="text-center py-5">
                        <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                    </div>
                ) : Object.keys(categoriesData).length > 0 ? (
                    Object.entries(categoriesData).map(([categoryName, posts]) => (
                        <CategorySection 
                            key={categoryName}
                            categoryName={categoryName}
                            posts={posts}
                        />
                    ))
                ) : (
                    <h4 className="text-center text-muted py-5">
                        Aucune annonce disponible pour le moment
                    </h4>
                )}
            </div>
        );
    }

    // 🔹 RENDERIZADO NORMAL (sin cambios)
    return (
        <div>
            <div className="post_thumb">
                {homePosts.posts.map(post => (
                    <PostCard key={post._id} post={post} theme={theme} />
                ))}
                
                {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}
            </div>
            
            <LoadMoreBtn 
                result={homePosts.result} 
                page={homePosts.page}
                load={load} 
                handleLoadMore={handleLoadMore} 
            />
        </div>
    )
}

export default Posts;