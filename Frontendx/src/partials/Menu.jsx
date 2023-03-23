//import axios
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Menu = ({ cat }) => {
  /*const posts = [
    {
      id: 1,
      title: 'Messi still being the GOAT',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repudiandae sint ipsa ducimus explicabo, illum dolores distinctio odio mollitia excepturi modi repellat voluptate consequuntur nesciunt corrupti placeat blanditiis aliquam eligendi.',
      img: 'https://images.pexels.com/photos/14980647/pexels-photo-14980647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 2,
      title: 'Dictatorship is back in 404',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repudiandae sint ipsa ducimus explicabo, illum dolores distinctio odio mollitia excepturi modi repellat voluptate consequuntur nesciunt corrupti placeat blanditiis aliquam eligendi.',
      img: 'https://images.pexels.com/photos/4646816/pexels-photo-4646816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 3,
      title: 'Rising cost of living extends poverty in 404',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repudiandae sint ipsa ducimus explicabo, illum dolores distinctio odio mollitia excepturi modi repellat voluptate consequuntur nesciunt corrupti placeat blanditiis aliquam eligendi.',
      img: 'https://images.pexels.com/photos/3943722/pexels-photo-3943722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 4,
      title: 'Creed III could win the Oscar',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repudiandae sint ipsa ducimus explicabo, illum dolores distinctio odio mollitia excepturi modi repellat voluptate consequuntur nesciunt corrupti placeat blanditiis aliquam eligendi.',
      img: 'https://images.pexels.com/photos/12282183/pexels-photo-12282183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];*/

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/posts/?cat=${cat}`
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={`../upload/${post?.img}`} alt="" />
          <h2>{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
