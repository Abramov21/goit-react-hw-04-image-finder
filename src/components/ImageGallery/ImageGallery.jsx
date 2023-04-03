import { Component, useEffect, useState } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { fetchImages } from 'components/services/imageApi';
import s from './ImageGallery.module.css';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import PropTypes from 'prop-types';

export const ImageGallery = ({ onLoadMore, query, page }) => {
  // state = {
  //   images: [],
  //   isLoading: false,
  //   isRenderBtn: true,
  // };
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRenderBtn, setIsRenderBtn] = useState(true);
  console.log(query);
  console.log(page);
  // console.log();

  useEffect(() => {
    if (query === '') {
      return;
    }
    setIsLoading(true);

    fetchImages(query, page)
      .then(data => {
        console.log(data);
        console.log(query);
        setIsRenderBtn(true);

        let total = data.totalHits;
        let length = data.hits.length;
        if (length < 12) {
          setIsRenderBtn(false);
          // this.setState({ isRenderBtn: false });
        }

        if (!length) {
          setImages([]);
          setIsLoading(false);
          // this.setState({ images: [], isLoading: false });

          if (total <= length) {
            return alert(`No results matching "${query}"`);
          }
        }

        setImages(prev => {
          return page === 1 ? data.hits : [...prev, ...data.hits];
        });
        // setIsLoading(false);

        // this.setState({
        //   images: page === 1 ? data.hits : [...images, ...data.hits],
        //   isLoading: false,
        // });
      })
      .catch(error => console.log(error.message))
      .finally(() => setIsLoading(false));
  }, [query, page]);

  // componentDidUpdate(prevProps, prevState) {
  //   const { query, page } = this.props;
  //   const { images } = this.state;

  //   if (prevProps.query !== query || prevProps.page !== page) {
  //     this.setState({ isLoading: true });

  //     fetchImages(query, page)
  //       .then(data => {
  //         this.setState({ isRenderBtn: true });

  //         // console.log(data);
  //         let total = data.totalHits;
  //         let length = data.hits.length;
  //         // console.log(length);
  //         if (length < 12) {
  //           this.setState({ isRenderBtn: false });
  //         }

  //         if (!data.hits.length) {
  //           this.setState({ images: [], isLoading: false });
  //           if (total <= length) {
  //             return alert(`No results matching "${query}"`);
  //           }
  //         }

  //         this.setState({
  //           images: page === 1 ? data.hits : [...images, ...data.hits],
  //           isLoading: false,
  //         });
  //       })
  //       .catch(error => console.log(error.message));
  //   }
  // }

  return (
    <>
      <ul className={s.ImageGallery}>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            imgUrl={webformatURL}
            largeImgUrl={largeImageURL}
            tags={tags}
          />
        ))}
      </ul>
      {isLoading && <Loader />}
      {images.length > 0 && isRenderBtn && (
        <Button children={'Load more'} onClick={onLoadMore} />
      )}
    </>
  );
};

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};

export class ImageGallerys extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    onLoadMore: PropTypes.func.isRequired,
  };

  state = {
    images: [],
    isLoading: false,
    isRenderBtn: true,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.props;
    const { images } = this.state;

    if (prevProps.query !== query || prevProps.page !== page) {
      this.setState({ isLoading: true });

      fetchImages(query, page)
        .then(data => {
          this.setState({ isRenderBtn: true });

          // console.log(data);
          let total = data.totalHits;
          let length = data.hits.length;
          // console.log(length);
          if (length < 12) {
            this.setState({ isRenderBtn: false });
          }

          if (!data.hits.length) {
            this.setState({ images: [], isLoading: false });
            if (total <= length) {
              return alert(`No results matching "${query}"`);
            }
          }

          this.setState({
            images: page === 1 ? data.hits : [...images, ...data.hits],
            isLoading: false,
          });
        })
        .catch(error => console.log(error.message));
    }
  }

  render() {
    const { images, isLoading, isRenderBtn } = this.state;
    const { onLoadMore } = this.props;

    return (
      <>
        <ul className={s.ImageGallery}>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              imgUrl={webformatURL}
              largeImgUrl={largeImageURL}
              tags={tags}
            />
          ))}
        </ul>
        {isLoading && <Loader />}
        {images.length > 0 && isRenderBtn && (
          <Button children={'Load more'} onClick={onLoadMore} />
        )}
      </>
    );
  }
}
