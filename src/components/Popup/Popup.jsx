import styles from './Popup.module.css'
import { useEffect } from 'react'

function Popup({ user, onClose }) {
  const name = user.firstName + ' ' + user.lastName + ' ' + user.maidenName;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={styles.popup} onClick={onClose}>
      <div className={styles.wrapper} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>X</button>
        <header className={styles.header}>
          <img className={styles.avatar} src={user.image} alt={name}/>
          <h2 className={styles.title}>{name}</h2>
        </header>
        <section className={styles.section}>
          <h3 className={styles.heading}>Информация</h3>
          <p className={styles.text}>
            Возраст: {user.age} лет <br />
            Рост: {user.height} см <br />
            Вес: {user.weight} кг
          </p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.heading}>Контакты</h3>
          <address className={styles.address}>
            <a className={styles.link} href={`tel:${user.phone.split(/[ -]+/).join('')}`}>Телефон: {user.phone}</a>
            <a className={styles.link} href={`mailto:${user.email}`}>Email: {user.email}</a>
            <p className={styles.text}>
              Страна: {user.address.country} <br/>
              Город: {user.address.city}
            </p>
          </address>
        </section>
      </div>
    </div>
  )
}

export default Popup;