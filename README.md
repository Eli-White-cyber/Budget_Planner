# Monthly Budget Planner

## Overview

The Monthly Budget Planner is a web application designed to help users track their income, manage their spending, and visualize their budget. Users can input their monthly income, add budget categories, and see dynamic updates to totals, remaining balance, and spending distribution. The app also provides visual charts and progress bars to make budgeting easier to understand at a glance.

---

## Features

- **Income Input**: Enter your monthly income to base your budget calculations on.  
- **Budget Categories**: Add and remove categories (e.g., Rent, Food, Entertainment). Each category displays its spending percentage with a progress bar.  
- **Budget Summary**: Displays total spending, remaining money, and a rating indicating budget health.  
- **Interactive Charts**: Pie chart and bar chart visualize spending per category. Charts update automatically as categories are added or removed.  
- **Persistent Data**: Uses LocalStorage to save income and category data so it persists even after refreshing the page.  
- **Dark Theme**: Clean, professional dark interface for readability and visual appeal.  

---

## Technologies Used

- **HTML**: Semantic structure for forms, tables, and sections.  
- **CSS**: Modern styling, Flexbox layout for responsive design, progress bars, and dark theme.  
- **JavaScript**: DOM manipulation, loops, functions, LocalStorage, and dynamic updates.  
- **Chart.js**: Library used to create pie and bar charts for visual budget representation.  

---

## How to Use

1. Open index.html in a browser.  
2. Enter your monthly income in the **Income Input** section and save.  
3. Add budget categories with names and amounts using the **Add Category** form.  
4. View your categories, total spending, remaining balance, and budget rating in the **Budget Breakdown** and **Summary** sections.  
5. Observe the **Pie and Bar charts** updating dynamically based on your data.  
6. Refresh the page and your data will remain thanks to LocalStorage.  

---

## Future Improvements

- Allow exporting budget data as a CSV file.  
- Add pre-defined budget templates for common expenses.  
- Include more interactive charts or additional visualization options.  

---

## Project Structure

