// Import assets for EP 1 (AFX)
import afx_front from '../assets/1/afx_selected8582_front.jpg';
import afx_back from '../assets/1/afx_selected8582_back.jpg';
import afx_aside from '../assets/1/afx_selected8582_aside.png';
import afx_bside from '../assets/1/afx_selected8582_bside.png';

// Import assets for EP 2 (Deftones White Pony)
import wp_front from '../assets/2/deftones_whitepony_front.avif';
import wp_back from '../assets/2/deftones_whitepony_back.jpg';
import wp_aside from '../assets/2/deftones_whitepony_aside.png';
import wp_bside from '../assets/2/deftones_whitepony_bside.png';

// Import assets for EP 3 (Björk Post)
import bjork_front from '../assets/3/bjork_post_front.jpg';
import bjork_back from '../assets/3/bjork_post_back.jpg';
import bjork_aside from '../assets/3/bjork_post_aside.png';
import bjork_bside from '../assets/3/bjork_post_bside.png';

// Import assets for EP 4 (MF DOOM Madvillainy)
import madvillainy_front from '../assets/4/mfdoom_madvillainy_front.jpg';
import madvillainy_back from '../assets/4/mfdoom_madvillainy_back.jpg';
import madvillainy_aside from '../assets/4/mfdoom_madvillainy_aside.png';
import madvillainy_bside from '../assets/4/mfdoom_madvillainy_bside.png';

// Import assets for EP 5 (Mac Miller Kids)
import kids_front from '../assets/5/macmiller_kids_front.jpg';
import kids_back from '../assets/5/macmiller_kids_back.jpg';
import kids_aside from '../assets/5/macmiller_kids_aside.png';
import kids_bside from '../assets/5/macmiller_kids_bside.png';

export const data = [
  {
    id: 1,
    title: "AFX Selected Ambient Works",
    artist: "Aphex Twin",
    year: "1994",
    images: {
      front: afx_front,
      back: afx_back,
      aSide: afx_aside,
      bSide: afx_bside
    },
    theme: {
      background: '#1a1a1a',
      extractedBackground: '#D8D6D2',
      lightColor: 'rgba(255,255,255,0.02)',
      extractedLightColor: 'rgba(255,215,0,0.03)'
    }
  },
  {
    id: 2,
    title: "White Pony",
    artist: "Deftones",
    year: "2000",
    images: {
      front: wp_front,
      back: wp_back,
      aSide: wp_aside,
      bSide: wp_bside
    },
    theme: {
      background: '#C1B8A1',
      extractedBackground: '#C1B8A1',
      lightColor: 'rgba(200,200,255,0.02)',
      extractedLightColor: 'rgba(150,150,255,0.03)'
    }
  },
  {
    id: 3,
    title: "Post",
    artist: "Björk",
    year: "1995",
    images: {
      front: bjork_front,
      back: bjork_back,
      aSide: bjork_aside,
      bSide: bjork_bside
    },
    theme: {
      background: '#E04174',
      extractedBackground: '#6F66B0',
      lightColor: 'rgba(255,100,255,0.02)',
      extractedLightColor: 'rgba(255,100,255,0.03)'
    }
  },
  {
    id: 4,
    title: "Madvillainy",
    artist: "MF DOOM & Madlib",
    year: "2004",
    images: {
      front: madvillainy_front,
      back: madvillainy_back,
      aSide: madvillainy_aside,
      bSide: madvillainy_bside
    },
    theme: {
      background: '#70706E',
      extractedBackground: '#E3784B',
      lightColor: 'rgba(255,165,0,0.02)',
      extractedLightColor: 'rgba(255,140,0,0.03)'
    }
  },
  {
    id: 5,
    title: "K.I.D.S.",
    artist: "Mac Miller",
    year: "2010",
    images: {
      front: kids_front,
      back: kids_back,
      aSide: kids_aside,
      bSide: kids_bside
    },
    theme: {
      background: '#1C8768',
      extractedBackground: '#262A28',
      lightColor: 'rgba(100,255,150,0.02)',
      extractedLightColor: 'rgba(50,255,100,0.03)'
    }
  }
]; 