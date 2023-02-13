import logo from '../../images/react.png'
function Header(){
    return(
        <div className='pt-2 py-1 pl-2 border-bottom'>
        <img src={logo} style={{height:"35px", verticalAlign:"top"}}/>
        <span className='h1 pt-4 text-white'>ContactOPedia</span>
      </div>
    )
}

export default Header;