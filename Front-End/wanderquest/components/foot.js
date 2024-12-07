'use client'
import React from 'react';
import Link from 'next/link';
import styles from '../styles/foot.module.css';
import { FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa';

const foot = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>About</h3>
          <ul>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/jobs">Jobs</Link></li>
            <li><Link href="/press">In Press</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Support</h3>
          <ul>
            <li><Link href="/contact">Contact us</Link></li>
            <li><Link href="/chat">Online Chat</Link></li>
            <li><Link href="/whatsapp">Whatsapp</Link></li>
            <li><Link href="/telegram">Telegram</Link></li>
            <li><Link href="/ticketing">Ticketing</Link></li>
            <li><Link href="/call-center">Call Center</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>FAQ</h3>
          <ul>
            <li><Link href="/account">Account</Link></li>
            <li><Link href="/booking">Booking</Link></li>
            <li><Link href="/payments">Payments</Link></li>
            <li><Link href="/returns">Returns</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms & Condition</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Newsletter</h3>
          <p>Don't miss out on the exciting world of travel – subscribe now and embark on a journey of discovery with us.</p>
          <div className={styles.newsletterForm}>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Submit</button>
          </div>
          <div className={styles.socialLinks}>
            <Link href="https://instagram.com"><FaInstagram /></Link>
            <Link href="https://facebook.com"><FaFacebook /></Link>
            <Link href="https://youtube.com"><FaYoutube /></Link>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>©2023 Indotravi, All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default foot;