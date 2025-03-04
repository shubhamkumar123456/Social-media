/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import Face from '@mui/icons-material/Face';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { formatDistanceToNow } from 'date-fns';

export default function Posts(props) {
    const settings = {
  
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        arrows:false,
        dots:true
      };
    return (
        <Card
            variant="outlined"
            sx={{ minWidth: 300, '--Card-radius': (theme) => theme.vars.radius.xs }}
        >
            <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
                <Box
                    sx={{
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            m: '-2px',
                            borderRadius: '50%',
                            background:
                                'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                        },
                    }}
                >
                    <Avatar
                        size="md"
                        src={props.ele.userId.profilePic}
                        sx={{ border: '2px solid',borderRadius:'100%', borderColor: 'background.body' }}
                    />
                </Box>
                <Typography sx={{ fontWeight: 'lg' }}>{props.ele.userId.name}</Typography>
                <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
                    <MoreHoriz />
                </IconButton>
            </CardContent>
        
   {  props.ele.file.length >0   &&   <Slider {...settings} className='h-[250px] relative flex'>
    {
        props.ele.file.map((url, index) => (
            url.includes('image') ? (
                <div key={index}>
                    <img className='w-full object-contain h-[250px]' src={url} alt={`Slide ${index + 1}`} />
                </div>
            ) :(
                <div key={index}>
                    <video className='w-full h-[250px]' controls src={url}></video>
                </div>
            )
            
            
        ))
    }
</Slider>}

            <CardContent orientation="horizontal" sx={{ alignItems: 'center', mx: -1 }}>
                <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
                    <IconButton variant="plain" color="neutral" size="sm">
                        <FavoriteBorder />
                    </IconButton>
                    <IconButton variant="plain" color="neutral" size="sm">
                        <ModeCommentOutlined />
                    </IconButton>
                    <IconButton variant="plain" color="neutral" size="sm">
                        <SendOutlined />
                    </IconButton>
                </Box>
               
             
            </CardContent>
            <CardContent>
                <Link
                    component="button"
                    underline="none"
                    textColor="text.primary"
                    sx={{ fontSize: 'sm', fontWeight: 'lg' }}
                >
                    {props.ele.likes.length} Likes
                </Link>
                <Typography sx={{ fontSize: 'sm' }}>
                   
                   {props.ele.title}
                </Typography>
                <Link
                    component="button"
                    underline="none"
                    startDecorator="…"
                    sx={{ fontSize: 'sm', color: 'text.tertiary' }}
                >
                    more
                </Link>
                <Link
                    component="button"
                    underline="none"
                    sx={{ fontSize: '10px', color: 'text.tertiary', my: 0.5 }}
                >
                   {props.ele.createdAt && formatDistanceToNow(new Date(props.ele.createdAt), { addSuffix: true })}
                </Link>
            </CardContent>
            <CardContent orientation="horizontal" sx={{ gap: 1 }}>
                <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
                    <Face />
                </IconButton>
                <Input
                    variant="plain"
                    size="sm"
                    placeholder="Add a comment…"
                    sx={{ flex: 1, px: 0, '--Input-focusedThickness': '0px' }}
                />
                <Link disabled underline="none" role="button">
                    Post
                </Link>
            </CardContent>
        </Card>
    );
}
