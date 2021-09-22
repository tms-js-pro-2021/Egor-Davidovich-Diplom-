import React, { useEffect, useState } from 'react';
import RoomList from '../RoomList';
import styles from './MainContent.module.scss';
import AddToPhotosOutlinedIcon from '@material-ui/icons/AddToPhotosOutlined';
import PopUpAdd from '../PopUpAdd/PopUpAdd';

const MainContent = () => {
  const [isShowPopupAdd, setIsShowPopupAdd] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    try {
      fetch('https://tms-js-pro-back-end.herokuapp.com/api/todos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtlbWFsa2FsYW5kYXJvdkBnbWFpbC5jb20iLCJpZCI6IjYxMDJiOWMxMmFhYTkwMGMwZTI2OGFkZSIsImV4cCI6MTYzNjM5NTk5NSwiaWF0IjoxNjMxMjExOTk1fQ.C-rdvGj-bj16smVKORldxkTYw75ZHu1aBXtlQ5ivk-o',
        },
      })
        .then((data) => data.json())
        .then((data) => setRooms(data));
    } catch (error) {
      console.log('SERVER ERROR');
    }
  }, []);

  const handleDeleteRoom = (id) => {
    try {
      fetch(`https://tms-js-pro-back-end.herokuapp.com/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtlbWFsa2FsYW5kYXJvdkBnbWFpbC5jb20iLCJpZCI6IjYxMDJiOWMxMmFhYTkwMGMwZTI2OGFkZSIsImV4cCI6MTYzNjM5NTk5NSwiaWF0IjoxNjMxMjExOTk1fQ.C-rdvGj-bj16smVKORldxkTYw75ZHu1aBXtlQ5ivk-o',
        },
      }).then(() => {
        const clonedRooms = [...rooms];
        setRooms(clonedRooms.filter((item) => id !== item.id));
      });
    } catch (error) {
      console.log('SERVER ERROR');
    }
  };

  const handleAddRoom = () => {
    try {
      fetch(`https://tms-js-pro-back-end.herokuapp.com/api/todos`, {
        method: 'POST',
        body: {
          title: '',
          guests: '0',
          address: '',
          floor: '0',
          booked: null,
          stuff: {
            coffee: false,
            tea: false,
            projector: false,
            water: true,
            webCamera: false,
            board: true,
            catering: false,
          },
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtlbWFsa2FsYW5kYXJvdkBnbWFpbC5jb20iLCJpZCI6IjYxMDJiOWMxMmFhYTkwMGMwZTI2OGFkZSIsImV4cCI6MTYzNjM5NTk5NSwiaWF0IjoxNjMxMjExOTk1fQ.C-rdvGj-bj16smVKORldxkTYw75ZHu1aBXtlQ5ivk-o',
        },
      }).then(() => {
        // const clonedRooms = [...rooms];
        // clonedRooms.filter((item) => item.id !== id);
        // handleDelete(clonedRooms);
        // console.log(clonedRooms);
        handleClose();
      });
    } catch (error) {
      console.log('SERVER ERROR');
    }
  };

  return (
    <div className={styles.main}>
      <button onClick={() => setIsShowPopupAdd(true)} className={styles.button__add}>
        <AddToPhotosOutlinedIcon
          style={{
            fontSize: '4rem',
          }}
        />
        <span className={styles.button__add__text}>ADD NEW ROOM</span>
      </button>
      <RoomList rooms={rooms} setRooms={setRooms} handleDeleteRoom={handleDeleteRoom} />
      <PopUpAdd
        open={isShowPopupAdd}
        handleClose={() => setIsShowPopupAdd(false)}
        handleAddRoom={handleAddRoom}
      />
    </div>
  );
};

export default MainContent;
