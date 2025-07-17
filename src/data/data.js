// Import assets for EP 1 (AFX)
import afx_front from '../assets/1/afx_selected8582_front.jpg';
import afx_back from '../assets/1/afx_selected8582_back.jpg';
import afx_aside from '../assets/1/afx_selected8582_aside.jpg';
import afx_bside from '../assets/1/afx_selected8582_bside.jpg';

// Import assets for EP 2 (Deftones White Pony)
import wp_front from '../assets/2/deftones_whitepony_front.avif';
import wp_back from '../assets/2/deftones_whitepony_back.jpg';
import wp_aside from '../assets/2/deftones_whitepony_aside.jpg';
import wp_bside from '../assets/2/deftones_whitepony_bside.jpg';

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
      extractedBackground: '#f5f5f5',
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
      background: '#0a0a0a',
      extractedBackground: '#f0f0f0',
      lightColor: 'rgba(200,200,255,0.02)',
      extractedLightColor: 'rgba(150,150,255,0.03)'
    }
  }
]; 