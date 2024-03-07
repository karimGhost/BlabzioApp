import React from 'react'
import { useAuth } from './useAuth';
import { useEffect } from 'react';
export default function Effects() {
  

  const {user} = useAuth()
  useEffect(() => {

    
    let inputs = document.querySelectorAll("input");
    inputs.forEach((input) => { 
   
      input.addEventListener('focusin', (e) => {
        document.querySelector(`label[for="${e.target.id}"]`).classList.add('ups');
      });
      input.addEventListener('focusout', (e) => {
        if (e.target.value.length === 0) {
          document.querySelector(`label[for="${e.target.id}"]`).classList.remove('ups');
        }
      });
    });
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('focusin', () => { document.querySelector(`label[for="${input.target.id}"]`).classList.remove('ups');
      });
        input.removeEventListener('focusout', () => {          document.querySelector(`label[for="${input.target.id}"]`).classList.remove('ups');
      });
      });
    };
  }, [user]);
  return (
    <div>
      
    </div>
  )
}
