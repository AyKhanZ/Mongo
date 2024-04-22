
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
                      <li><Link className='navLink' href='/team'>Наш коллектив</Link></li>
                      <li><a className='navLink'>Карьера</a></li> 
                      <li><Link className='navLink' href='/#crm'>Обратная связь</Link></li>
                   </menu>  
                </li> 
 
                <li id="demo2">
                    <Link className='navLink' href='/Продукты'>Продукты</Link>
                    <menu>
                        {drawSubcategories('/Продукты',pt)}
                    </menu>
                </li>

                <li id="demo2">
                    <Link className='navLink' href='/Услуги'>Услуги</Link>
                </li>

                <li><Link className='navLink' href='/clients'>Наши клиенты</Link></li>
                <li><Link className='navLink' href='/partners'>Наши партнёры</Link></li>

                <li id="demo2">
                    <Link className='navLink' href='/'>Полезные материалы</Link>
                    <menu>
                        <li><Link href='/Полезные материалы/Новости' className='navLink'>Новости</Link></li>
                    </menu>
                </li>

            </menu>
        </li>
    </menu>
</nav>
   )
}

export default NavMenu;

