import React from 'react'
import styles from './Product.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { Nunito } from "next/font/google";

const nunito = Nunito({subsets: ["latin"]});

const Product = ({category, product}: any) => {
  return (
    <div className={`${styles.horizontal} ${nunito.className}`}>                
        {category=='Новости' ? 
        <Image
          className={styles.imgContainer}
          src={product.img}
          alt="Product image" 
          width={280}
          height={220}
        /> :
        <Image
          className={styles.imgContainer}
          src={product.combinedImage}
          alt="Product image" 
          width={280}
          height={220}
        />}
 
      <div className={styles.productContent}>
        <div className={styles.productTitle}>
          <h2 className={styles.title}>{product.name}</h2>
        </div>

        <p className={styles.desc}>
          {product.description}
        </p>
      </div>
    </div>
    // <div key={p.id}> 
    //     <h2>{p.name}</h2>
    //     <button onClick={() => deleteProduct(p.id)}>x</button>
    //     <button onClick={() => editProduct(p.id)}>edit</button>
    // </div>
  )
}

export default Product