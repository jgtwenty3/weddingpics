

import CommentForm from '../../components/forms/CommentForm'


const Guestbook = () => {
  return (
    <div  className ="common-container font-gangsta">
      <h1> Thank you for coming!</h1>
      <h2> Please take a moment to sign our guestbook.</h2>
      <h2> Love, </h2>
      <h2> Lindsey and Justin</h2>
      
      <div><CommentForm  action="Create"/></div>
      

    </div>
  )
}

export default Guestbook