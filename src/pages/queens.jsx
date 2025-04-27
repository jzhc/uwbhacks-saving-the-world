import hanni from '../assets/hanni.webp';
import minji from '../assets/minji.jpg'
import chaewon from '../assets/chaewon.webp'
export default function HANNI() {
    return (
      <div style={{ display: 'flex', width: '80vw', height: '80vh' }}>
        <img src={hanni} style={{ flex: 1, objectFit: 'contain' }} />
        <img src={minji} style={{ flex: 1, objectFit: 'contain' }} />
        <img src={chaewon} style={{ flex: 1, objectFit: 'contain' }} />
      </div>
    )
}