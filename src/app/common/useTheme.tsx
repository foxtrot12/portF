import { useState, useEffect } from 'react';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

type ThemeT = 'dark' | 'light';

const useTheme = (): ThemeT => {
  const [theme, setTheme] = useState<ThemeT>('light');
  const bodyClassListChanges$ = new Observable<MutationRecord[]>((observer) => {
    // Create a MutationObserver to observe changes in classList
    const mutationObserver = new MutationObserver((mutations) => {
      observer.next(mutations);
    });
  
    // Start observing changes to the class attribute
    mutationObserver.observe(document.body, {
      attributes: true, // Listen to attribute changes
      attributeFilter: ['class'], // Only listen to changes in the 'class' attribute
    });
  
    // Clean up the observer when the subscription is terminated
    return () => mutationObserver.disconnect();
  });

  function getTheme():ThemeT{
    const className = document.body.className;

    const theme = Boolean(className) ? 'dark' : 'light';

    return theme
  }

  useEffect(() => {
    setTheme(getTheme());
    
    const subscription: Subscription = bodyClassListChanges$.subscribe(()=>{
        setTheme(getTheme())
      });

    return () => {
      subscription.unsubscribe()
    };
  }, []);
  return theme;
};

export default useTheme;
