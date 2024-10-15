// import React, { useState, useEffect } from 'react';
// import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
// import BasketImg from '../Assets/Images/basket.webp'; // Import your basket image

// // Draggable item component with dynamic color
// const DraggableItem = ({ id, label, color }) => {
//   const { attributes, listeners, setNodeRef, transform } = useDraggable({
//     id,
//   });

//   const style = {
//     transform: transform
//       ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
//       : 'none',
//     border: '2px solid #333',
//     padding: '20px',
//     margin: '10px',
//     backgroundColor: color, // Unique color for each item
//     cursor: 'grab',
//     width: '80px',
//     height: '80px',
//     textAlign: 'center',
//     lineHeight: '40px',
//     userSelect: 'none', // Prevent text selection
//     touchAction: 'none', // Required for touch devices to handle gestures
//     transition: 'transform 0.2s ease', // Smooth dragging animation
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
//       {label}
//     </div>
//   );
// };

// // Droppable bucket component with basket image background
// const DroppableBucket = ({ id, items }) => {
//   const { isOver, setNodeRef } = useDroppable({
//     id,
//   });

//   const style = {
//     width: '200px',
//     height: '200px',
//     backgroundImage: `url(${BasketImg})`, // Basket image background
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     border: isOver ? '3px solid green' : '3px solid #ccc',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: '20px auto',
//     position: 'relative', // Ensure items appear over the basket
//   };

//   return (
//     <div ref={setNodeRef} style={style}>
//       {items.length > 0 ? (
//         items.map((item) => (
//           <div key={item.id} style={{ padding: '5px', backgroundColor: item.color }}>
//             {item.label}
//           </div>
//         ))
//       ) : (
//         <p style={{ position: 'absolute', bottom: '10px' }}>Drop items here</p>
//       )}
//     </div>
//   );
// };

// const PutInItemPage = () => {
//   const initialItems = [
//     { id: 'item1', label: 'Item 1', color: '#FFD700' }, // Gold
//     { id: 'item2', label: 'Item 2', color: '#FF5733' }, // Red-Orange
//     { id: 'item3', label: 'Item 3', color: '#33FF57' }, // Green
//     { id: 'item4', label: 'Item 4', color: '#3357FF' }, // Blue
//   ];

//   const [items, setItems] = useState(initialItems);
//   const [bucketItems, setBucketItems] = useState([]);

//   const handleDragEnd = (event) => {
//     const { active, over } = event;

//     // Check if the dragged item is dropped in the bucket
//     if (over && bucketItems.length < 4) {
//       const draggedItem = items.find((item) => item.id === active.id);

//       if (draggedItem) {
//         // Add item to the bucket
//         setBucketItems((prev) => [...prev, draggedItem]);

//         // Remove the item from the draggable list (disappear from source)
//         setItems((prev) => prev.filter((item) => item.id !== draggedItem.id));
//       }
//     }
//   };

//   const resetBucket = () => {
//     // Reset the items to the initial state and clear the bucket
//     setItems(initialItems); // Restore original draggable items
//     setBucketItems([]); // Clear the bucket
//   };

//   // Prevent page scrolling while dragging
//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, []);

//   return (
//     <div style={styles.container}>
//       <h2>Drag Items into the Basket (In Any Order)</h2>
//       <DndContext onDragEnd={handleDragEnd}>
//         <div style={styles.draggableContainer}>
//           {items.map((item) => (
//             <DraggableItem key={item.id} id={item.id} label={item.label} color={item.color} />
//           ))}
//         </div>

//         <DroppableBucket id="bucket" items={bucketItems} />

//         {bucketItems.length > 0 && (
//           <button onClick={resetBucket} style={styles.resetButton}>
//             Reset Basket
//           </button>
//         )}
//       </DndContext>
//     </div>
//   );
// };

// // Simple responsive styling for mobile, tablet, and desktop
// const styles = {
//   container: {
//     padding: '20px',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     height: '100vh',
//     overflow: 'hidden', // Prevent scrolling
//   },
//   draggableContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     flexWrap: 'wrap',
//     maxWidth: '500px',
//     marginBottom: '20px',
//   },
//   resetButton: {
//     marginTop: '20px',
//     padding: '10px 20px',
//     fontSize: '16px',
//   },
// };

// export default PutInItemPage;

import React, { useState, useEffect } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import BasketImg from '../Assets/Images/basket.webp'; // Import your basket image

// Draggable item component with dynamic color
const DraggableItem = ({ id, label, color }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : 'none',
    border: '2px solid #333',
    padding: '20px',
    margin: '10px',
    backgroundColor: color, // Unique color for each item
    cursor: 'grab',
    width: '80px',
    height: '80px',
    textAlign: 'center',
    lineHeight: '40px',
    userSelect: 'none', // Prevent text selection
    touchAction: 'none', // Required for touch devices to handle gestures
    transition: 'transform 0.2s ease', // Smooth dragging animation
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {label}
    </div>
  );
};

// Droppable bucket component with basket image background
const DroppableBucket = ({ id, items }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    width: '400px', // Increased width to make the basket more horizontal
    height: '200px', // Keep height smaller to show a wider basket
    backgroundImage: `url(${BasketImg})`, // Basket image background
    backgroundSize: 'contain', // Ensure the basket fits inside the div
    backgroundRepeat: 'no-repeat', // Prevent repeating the basket image
    backgroundPosition: 'bottom', // Align the basket to the bottom
    border: isOver ? '3px solid green' : '3px solid #ccc',
    display: 'flex',
    flexDirection: 'row', // Align items horizontally inside the basket
    alignItems: 'flex-end', // Place items at the bottom of the basket
    justifyContent: 'center',
    margin: '20px auto',
    position: 'relative', // Ensure items appear over the basket
    overflow: 'hidden', // Prevent items from going outside the basket visually
  };

  return (
    <div ref={setNodeRef} style={style}>
      {items.length > 0 ? (
        items.map((item) => (
          <div key={item.id} style={{ padding: '5px', backgroundColor: item.color }}>
            {item.label}
          </div>
        ))
      ) : (
        <p style={{ position: 'absolute', bottom: '10px' }}>Drop items here</p>
      )}
    </div>
  );
};

const PutInItemPage = () => {
  const initialItems = [
    { id: 'item1', label: 'Item 1', color: '#FFD700' }, // Gold
    { id: 'item2', label: 'Item 2', color: '#FF5733' }, // Red-Orange
    { id: 'item3', label: 'Item 3', color: '#33FF57' }, // Green
    { id: 'item4', label: 'Item 4', color: '#3357FF' }, // Blue
  ];

  const [items, setItems] = useState(initialItems);
  const [bucketItems, setBucketItems] = useState([]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Check if the dragged item is dropped in the bucket
    if (over && bucketItems.length < 4) {
      const draggedItem = items.find((item) => item.id === active.id);

      if (draggedItem) {
        // Add item to the bucket
        setBucketItems((prev) => [...prev, draggedItem]);

        // Remove the item from the draggable list (disappear from source)
        setItems((prev) => prev.filter((item) => item.id !== draggedItem.id));
      }
    }
  };

  const resetBucket = () => {
    // Reset the items to the initial state and clear the bucket
    setItems(initialItems); // Restore original draggable items
    setBucketItems([]); // Clear the bucket
  };

  // Prevent page scrolling while dragging
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div style={styles.container}>
      <h2>Drag Items into the Basket (In Any Order)</h2>
      <DndContext onDragEnd={handleDragEnd}>
        <div style={styles.draggableContainer}>
          {items.map((item) => (
            <DraggableItem key={item.id} id={item.id} label={item.label} color={item.color} />
          ))}
        </div>

        <DroppableBucket id="bucket" items={bucketItems} />

        {bucketItems.length > 0 && (
          <button onClick={resetBucket} style={styles.resetButton}>
            Reset Basket
          </button>
        )}
      </DndContext>
    </div>
  );
};

// Simple responsive styling for mobile, tablet, and desktop
const styles = {
  container: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    overflow: 'hidden', // Prevent scrolling
  },
  draggableContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '500px',
    marginBottom: '20px',
  },
  resetButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
  },
};

export default PutInItemPage;
