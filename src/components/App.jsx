import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import s from './App.module.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const changeQuery = query => {
    setQuery(query);
    setPage(1);
    // this.setState({ query, page: 1 });
    // console.log(query);
  };

  const handleLoadMore = () => {
    // console.log('handleLoadMore');
    setPage(prev => prev + 1);
    // this.setState(prev => ({ page: prev.page + 1 }));
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={changeQuery} />
      <ImageGallery query={query} page={page} onLoadMore={handleLoadMore} />
    </div>
  );
};

// export class App extends Component {
//   state = {
//     query: '',
//     page: 1,
//   };

//   changeQuery = query => {
//     this.setState({ query, page: 1 });
//     // console.log(query);
//   };

//   handleLoadMore = () => {
//     // console.log('handleLoadMore');
//     this.setState(prev => ({ page: prev.page + 1 }));
//   };

//   render() {
//     // console.log(this.state.query);
//     const { query, page } = this.state;
//     return (
//       <div className={s.App}>
//         <Searchbar onSubmit={this.changeQuery} />
//         <ImageGallery
//           query={query}
//           page={page}
//           onLoadMore={this.handleLoadMore}
//         />
//       </div>
//     );
//   }
// }
