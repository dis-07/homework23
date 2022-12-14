import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const ImagesList = () => {
    const [photos, setPhotos] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [currenPage, setCurrenPage] = useState(1);

    useEffect(() => {
        setLoading(true);

        fetch(`https://picsum.photos/v2/list?page=${currenPage}&limit=10`)
        .then((responce) => responce.json())
        .then((data) => {
            setPhotos(prevState =>  [...prevState, ...data]);
        })
        .finally(setLoading(false));
}, [currenPage]);

    const handleShowMore = () => {
        setCurrenPage(value => value + 1);
    }

    if (isLoading) {
        return <p>loading...</p>
    }

    return (
        <>
            <p className="p">Image Gallery</p>
            <div className="div">
                {photos.map(({id, download_url}) => (
                <img className="img" key={id} src={download_url}/>
                ))}
                <button className="btn" type="button" onClick={handleShowMore}>Show more</button>
            </div>
        </>
    )
}

ImagesList.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
}

export default ImagesList;