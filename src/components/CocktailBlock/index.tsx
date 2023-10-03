'use client';
import { Cocktail } from '../../types/cocktails.types';
import { FC, useState, useEffect, useImperativeHandle } from 'react';
import styles from './block.module.css';


import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import { setList, isInList } from '../../storage-service/FavoritesService';
import { Star, StarFill } from 'react-bootstrap-icons';

interface Props {
  data: Cocktail;
  stateRef: any
}

const CocktailBlock: FC<Props> = ({ data, stateRef }) => {

  const [toggle, setToggle] = useState(false);
  const { strDrink, strCategory, strDrinkThumb, strInstructions } = data || {};
  const doFav = (data : Cocktail) => {
    const { idDrink, strDrink, strCategory, strDrinkThumb, strInstructions } = data;
    setList(data);
    setToggle(!toggle);
  };
  
  useImperativeHandle(stateRef, () => ({
    toggle 
  }), [toggle])

  return (
    <>
      <Card className={styles.cardBlock}>
        <Card.Img 
          variant="top" 
          src={strDrinkThumb} 
          alt={strDrink} />
        <Card.Body>
          <Card.Title>{strDrink}</Card.Title>
          <Badge bg="secondary">{strCategory}</Badge> 
          {
            isInList(data)?
              <StarFill className={`${styles.favorites} ${styles.active}`} onClick={() => {doFav(data)}} />
            :
              <Star className={styles.favorites} onClick={() => {doFav(data)}} />
          }
          
        </Card.Body>
      </Card>
    </>
    
  );
};

export default CocktailBlock;
