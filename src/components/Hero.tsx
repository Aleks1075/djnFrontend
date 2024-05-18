import coverphoto from '../assets/coverphoto.jpeg';

const Hero = () => {
  return (
    <div>
        <img src={coverphoto} className="w-full max-h-[600px] object-cover"/>
    </div>
  )
}

export default Hero;