import PostPic from './_root/pages/PostPic';
import './globals.css';
import {Routes, Route} from "react-router-dom";
import RootLayout from './_root/RootLayout';

import Home from './_root/pages/Home';
import { Toaster } from './components/ui/toaster';

import PostDetails from './_root/pages/PostDetails';


import Gallery from './_root/pages/Gallery';
import Guestbook from './_root/pages/Guestbook';

const App = () => {
  return (
    <main className = "flex h-screen">
        <Routes>
          
        
            <Route element = {<RootLayout/>}>
                <Route index element = {<Home/>}/>
                <Route path = "/gallery" element = {<Gallery/>}/>
                <Route path = "/post-pic" element = {<PostPic/>}/>
                <Route path = "/posts/:id" element = {<PostDetails/>}/>
                <Route path = "/guestbook" element = {<Guestbook/>}/>
      
                </Route>
      </Routes>
      <Toaster/>

    </main>
  )
}

export default App