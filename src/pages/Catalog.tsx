import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { books as allBooks, Book } from '@/data/books';

const Catalog = () => {
  const [cart, setCart] = useState<Book[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [showDiscountOnly, setShowDiscountOnly] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');

  const genres = Array.from(new Set(allBooks.map((book) => book.genre)));
  const categories = Array.from(new Set(allBooks.map((book) => book.category)));
  const topics = Array.from(new Set(allBooks.map((book) => book.topic)));

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const addToCart = (book: Book) => {
    setCart([...cart, book]);
  };

  const removeFromCart = (bookId: number) => {
    setCart(cart.filter((item) => item.id !== bookId));
  };

  const toggleFavorite = (bookId: number) => {
    if (favorites.includes(bookId)) {
      setFavorites(favorites.filter((id) => id !== bookId));
    } else {
      setFavorites([...favorites, bookId]);
    }
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedCategories([]);
    setSelectedTopics([]);
    setPriceRange([0, 2000]);
    setShowDiscountOnly(false);
    setShowNewOnly(false);
  };

  let filteredBooks = allBooks.filter((book) => {
    if (selectedGenres.length > 0 && !selectedGenres.includes(book.genre)) return false;
    if (selectedCategories.length > 0 && !selectedCategories.includes(book.category)) return false;
    if (selectedTopics.length > 0 && !selectedTopics.includes(book.topic)) return false;
    if (book.price < priceRange[0] || book.price > priceRange[1]) return false;
    if (showDiscountOnly && !book.discount) return false;
    if (showNewOnly && !book.isNew) return false;
    return true;
  });

  if (sortBy === 'price-asc') {
    filteredBooks = [...filteredBooks].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filteredBooks = [...filteredBooks].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name') {
    filteredBooks = [...filteredBooks].sort((a, b) => a.title.localeCompare(b.title));
  }

  const activeFiltersCount =
    selectedGenres.length +
    selectedCategories.length +
    selectedTopics.length +
    (showDiscountOnly ? 1 : 0) +
    (showNewOnly ? 1 : 0) +
    (priceRange[0] !== 0 || priceRange[1] !== 2000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header cart={cart} onRemoveFromCart={removeFromCart} />

      <div className="flex-1">
        <section className="bg-gradient-to-br from-secondary/30 to-background py-12 border-b">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Каталог книг</h1>
            <p className="text-muted-foreground">
              Найдено книг: {filteredBooks.length} из {allBooks.length}
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Фильтры</h2>
                  {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Сбросить ({activeFiltersCount})
                    </Button>
                  )}
                </div>

                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Icon name="BookOpen" size={18} />
                        Жанр
                      </h3>
                      <div className="space-y-2">
                        {genres.map((genre) => (
                          <div key={genre} className="flex items-center space-x-2">
                            <Checkbox
                              id={`genre-${genre}`}
                              checked={selectedGenres.includes(genre)}
                              onCheckedChange={() => toggleGenre(genre)}
                            />
                            <Label
                              htmlFor={`genre-${genre}`}
                              className="text-sm cursor-pointer leading-tight"
                            >
                              {genre}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Icon name="Users" size={18} />
                        Автор
                      </h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={`category-${category}`}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => toggleCategory(category)}
                            />
                            <Label
                              htmlFor={`category-${category}`}
                              className="text-sm cursor-pointer leading-tight"
                            >
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Icon name="List" size={18} />
                        Тематика
                      </h3>
                      <div className="space-y-2">
                        {topics.map((topic) => (
                          <div key={topic} className="flex items-center space-x-2">
                            <Checkbox
                              id={`topic-${topic}`}
                              checked={selectedTopics.includes(topic)}
                              onCheckedChange={() => toggleTopic(topic)}
                            />
                            <Label
                              htmlFor={`topic-${topic}`}
                              className="text-sm cursor-pointer leading-tight"
                            >
                              {topic}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Icon name="DollarSign" size={18} />
                        Цена
                      </h3>
                      <div className="space-y-4">
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          min={0}
                          max={2000}
                          step={50}
                          className="w-full"
                        />
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{priceRange[0]} ₽</span>
                          <span>{priceRange[1]} ₽</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6 space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="discount"
                          checked={showDiscountOnly}
                          onCheckedChange={(checked) => setShowDiscountOnly(checked as boolean)}
                        />
                        <Label htmlFor="discount" className="text-sm cursor-pointer">
                          Только со скидкой
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="new"
                          checked={showNewOnly}
                          onCheckedChange={(checked) => setShowNewOnly(checked as boolean)}
                        />
                        <Label htmlFor="new" className="text-sm cursor-pointer">
                          Только новинки
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>

            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  <Button
                    variant={sortBy === 'default' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSortBy('default')}
                  >
                    По умолчанию
                  </Button>
                  <Button
                    variant={sortBy === 'price-asc' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSortBy('price-asc')}
                  >
                    Дешевле
                  </Button>
                  <Button
                    variant={sortBy === 'price-desc' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSortBy('price-desc')}
                  >
                    Дороже
                  </Button>
                  <Button
                    variant={sortBy === 'name' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSortBy('name')}
                  >
                    По алфавиту
                  </Button>
                </div>
              </div>

              {filteredBooks.length === 0 ? (
                <Card className="p-12 text-center">
                  <Icon name="BookX" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Книги не найдены</h3>
                  <p className="text-muted-foreground mb-4">
                    Попробуйте изменить параметры фильтрации
                  </p>
                  <Button onClick={clearFilters}>Сбросить фильтры</Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredBooks.map((book) => (
                    <Link to={`/book/${book.id}`} key={book.id}>
                      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover-scale">
                        <div className="relative">
                          <img
                            src={book.image}
                            alt={book.title}
                            className="w-full h-64 object-cover"
                          />
                          {book.discount && (
                            <Badge className="absolute top-3 right-3 bg-accent">
                              -{book.discount}%
                            </Badge>
                          )}
                          {book.isNew && (
                            <Badge className="absolute top-3 right-3 bg-primary">Новинка</Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-3 left-3 bg-white/90 hover:bg-white"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleFavorite(book.id);
                            }}
                          >
                            <Icon
                              name="Heart"
                              size={20}
                              className={
                                favorites.includes(book.id) ? 'fill-accent text-accent' : ''
                              }
                            />
                          </Button>
                        </div>
                        <CardContent className="pt-4">
                          <Badge variant="outline" className="mb-2 text-xs">
                            {book.genre}
                          </Badge>
                          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{book.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                            {book.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-primary">{book.price} ₽</span>
                            {book.oldPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                {book.oldPrice} ₽
                              </span>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            className="w-full"
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart(book);
                            }}
                          >
                            <Icon name="ShoppingCart" size={16} className="mr-2" />
                            В корзину
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;