import { useState } from "react";

function ProductForm() {
  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    email: "",
  });

  // เก็บข้อความ error แยกตาม field
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    // name
    if (!form.name.trim()) newErrors.name = "Name is required.";

    // image
    if (!form.image.trim()) newErrors.image = "Image is required.";

    // price
    if (form.price === "" || form.price === null) {
      newErrors.price = "Price is required.";
    } else {
      const priceNumber = Number(form.price);
      if (Number.isNaN(priceNumber)) {
        newErrors.price = "Price is required.";
      } else if (priceNumber < 0) {
        newErrors.price = "Price cannot be less than 0.";
      }
    }

    // description
    if (!form.description.trim()) newErrors.description = "Description is required.";

    // email
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      // simple email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) newErrors.email = "Invalid email format.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      image: form.image.trim(),
      description: form.description.trim(),
      email: form.email.trim(),
    };

    // แสดงผลด้วย built-in alert ตามโจทย์
    alert(JSON.stringify(payload, null, 2));

    // ถ้าต้องการ เคลียร์ฟอร์ม:
    setForm({ name: "", image: "", price: "", description: "", email: "" });
  };

  return (
    <form className="post-form" onSubmit={handleSubmit} noValidate>
      <h1>Create Product Form</h1>

      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name here"
            value={form.name}
            onChange={handleChange}
          />
        </label>
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>

      <div className="input-container">
        <label>
          Image Url
          <input
            id="image"
            name="image"
            type="text"
            placeholder="Enter image url here"
            value={form.image}
            onChange={handleChange}
          />
        </label>
        {errors.image && <p className="error-message">{errors.image}</p>}
      </div>

      <div className="input-container">
        <label>
          Price
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Enter price here"
            value={form.price}
            onChange={handleChange}
            step="0.01"
            min="0"
          />
        </label>
        {errors.price && <p className="error-message">{errors.price}</p>}
      </div>

      <div className="input-container">
        <label>
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Enter description here"
            value={form.description}
            onChange={handleChange}
            rows={4}
            cols={30}
          />
        </label>
        {errors.description && <p className="error-message">{errors.description}</p>}
      </div>

      <div className="input-container">
        <label>
          User's email
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email here"
            value={form.email}
            onChange={handleChange}
          />
        </label>
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>

      <div className="form-actions">
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default ProductForm;
