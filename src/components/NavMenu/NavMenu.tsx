
import { useState } from 'react';
import Link from 'next/link';
import { Products } from '../../../lib/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars as bars} from '@fortawesome/free-solid-svg-icons'

function NavMenu() {
 
    const getUniqueElements = (arr: string[]) => {
        let uniqueArray = [];
        
        for (let i = 0; i < arr.length; i++) {
          if (uniqueArray.indexOf(arr[i]) === -1) {
            uniqueArray.push(arr[i]);
          }
        }
         
        return uniqueArray;
    }
      

    const getProductTypes = () => {
        const productTypes = Products.map(p => p.productType)
        return getUniqueElements(productTypes)
    }

    const getProductType = (productType: string) => {
        return Products.filter(p => productType === p.productType)
    }

    const drawSubcategories = (route: string, arr: string[]) => {
        return arr.map((p, i) => <li key={i}><Link className='navLink' href={`${route}/${p}`}>{p}</Link></li>)
    }


    const productTypes = getProductTypes();
    const pt = productTypes.filter(pt => pt !== 'Услуги')
    const so = getProductType('Услуги')
    const s = so.map(ss => ss.name)
   
   return (
    <nav>
    <menu>
        <li id="demo1">
            <a id="drop"><span>Меню</span> <span className="white"><FontAwesomeIcon className="fa-solid fa-bars" icon={bars} /></span></a>
            <menu>
            
                <li>
                   <Link className='navLink' href='/'>О компании</Link>
                   <menu>
                      <li><a className='navLink'>Информация</a></li>
                      <li><a className='navLink'>Наш коллектив</a></li>
                      <li><a className='navLink'>Карьера</a></li> 
                      <li><a className='navLink'>Обратная связь</a></li>
                   </menu>  
                </li>

                <li id="demo2">
                    <Link className='navLink' href='/products'>Продукты</Link>
                    <menu>
                        {drawSubcategories('/products',pt)}
                    </menu>
                </li>

                <li id="demo2">
                    <Link className='navLink' href='/services'>Услуги</Link>
                    <menu>
                        {drawSubcategories('/service',s)}
                    </menu>
                </li>

                <li><Link className='navLink' href='/clients'>Наши клиенты</Link></li>

                <li id="demo2">
                    <Link className='navLink' href='/materials'>Полезные материалыы</Link>
                    <menu>
                        <li><a className='navLink'>Новости</a></li>
                        <li><a className='navLink'>Инструкции</a></li>
                        <li><a className='navLink'>Видеоматериалы</a></li>
                    </menu>
                </li>

            </menu>
        </li>
    </menu>
</nav>
   )
}

export default NavMenu;

