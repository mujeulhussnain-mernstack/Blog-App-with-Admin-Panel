import { Search } from 'lucide-react';
const HeroSection = () => {
    const searchBlog = (e) => {
        e.preventDefault();
    }
    return (
        <div className='pt-20 lg:pt-30 w-full'>
            <div className='flex flex-col items-center gap-7 md:gap-10 lg:gap-13 py-10'>
                <h1
                    className='poppins text-center font-bold text-3xl md:text-5xl lg:text-6xl md:w-10/12 tracking-wider bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                >
                    A Single Perspective,
                    Many Worlds.
                </h1>
                <p
                    className='font-mono text-sm md:text-md lg:text-lg px-2 text-gray-700'
                >
                    This is a curated space for exploration. Written and edited by one voice, each post dives into the intersections of Technology, Philosophy, and Everyday Life. It’s a consistent inquiry into how our tools shape our thoughts—and our days. Welcome to a slower, more considered conversation.
                </p>
                <div className='flex-center'>
                    <form
                        onSubmit={searchBlog}
                        className='flex-center h-12 border border-black w-70 lg:w-90 shadow-[-8px_8px_0px_0px_black]'>
                        <input type="text"
                            placeholder='Search via title...'
                            className='h-full px-2 focus:outline-none w-full'
                        />
                        <button type='submit' className='px-4 py-2 cursor-pointer border-l border-black h-full'><Search /></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default HeroSection