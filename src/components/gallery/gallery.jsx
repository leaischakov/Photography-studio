import * as React from 'react';


import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { observer } from 'mobx-react-lite';
import chalake1 from '../../assets/chalake.jpg/';
import alef2 from '../../assets/alef2.jpg';
import alef3 from '../../assets/alef3.jpg/';
import alef4 from '../../assets/alef4.jpg/';
import alef5 from '../../assets/alef5.jpg/';
import alef7 from '../../assets/alef7.jpg/';
import alef8 from '../../assets/alef8.jpg/';
import alef9 from '../../assets/alef9.jpg/';
import newBorn from '../../assets/newBorn.jpg/';
import smashaCake from '../../assets/smasheCake.jpg';
import purim from '../../assets/purim.jpg';
import alef1 from '../../assets/alef1.jpg'
import smasheCake1 from '../../assets/smasheCake1.jpg'
import smasheCake2 from '../../assets/smasheCake2.jpg'
import smasheCake3 from '../../assets/smasheCake3.jpg'
import smasheCake4 from '../../assets/smasheCake4.jpg'
import smasheCake5 from '../../assets/smasheCake5.jpg'
import smasheCake6 from '../../assets/smasheCake6.jpg'
import purim1 from '../../assets/purim1.jpg'
import purim2 from '../../assets/purim2.jpg'
import purim3 from '../../assets/purim3.jpg'



const Gallery = observer(() => {
    const itemData = [
        {
            img: purim,
            title: 'purim',
        },
        {
            img: smashaCake,
            title: 'smashaCake',
        },
        {
            img: newBorn,
            title: 'newBorn',
        },
        {
            img: chalake1,
            title: 'chalake',
        },
        {
            img: alef1,
            title: 'Hats',
        },
        {
            img: alef9,
            title: 'Honey',
        },
        {
            img: alef8,
            title: 'Basketball',
        },
        {
            img: alef7,
            title: 'Fern',
        },
        {
            img: alef5,
            title: 'Tomato basil',
        },
        {
            img: alef4,
            title: 'Sea star',
        },
        {
            img: alef3,
            title: 'Bike',
        },
        {
            img: alef2,
            title: 'Bike',
        },
        {
            img: smasheCake6,
            title: 'Bike',
        },
        {
            img: smasheCake5,
            title: 'Bike',
        },
        {
            img: smasheCake4,
            title: 'Bike',
        },
        {
            img: smasheCake3,
            title: 'Bike',
        },
        {
            img: smasheCake2,
            title: 'Bike',
        },
        {
            img: smasheCake1,
            title: 'Bike',
        },
        {
            img: purim1,
            title: 'Bike',
        },
        {
            img: purim2,
            title: 'Bike',
        },
        {
            img: purim3,
            title: 'Bike',
        },
    ];

    return (
        <ImageList sx={{ width: '100%', height: '100%' }} cols={3} rowHeight={400}>
            {itemData.map((item) => (
                <ImageListItem key={item.img}>
                    <img
                        srcSet={`${item.img}?w=300&h=300&fit=crop&auto=format&dpr=2 2x`} // Set desired size here
                        src={`${item.img}?w=300&h=300&fit=crop&auto=format`} // Set desired size here
                        alt={item.title}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Ensure the image covers the container
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
})
export default Gallery