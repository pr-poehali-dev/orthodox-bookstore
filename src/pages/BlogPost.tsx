import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blogPosts';
import { Book } from '@/data/books';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState<Book[]>([]);

  const post = blogPosts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header
          cart={cart}
          onRemoveFromCart={(bookId) => setCart(cart.filter((b) => b.id !== bookId))}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Icon name="FileX" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Статья не найдена</h2>
            <p className="text-muted-foreground mb-6">
              Возможно, она была удалена или перемещена
            </p>
            <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const removeFromCart = (bookId: number) => {
    setCart(cart.filter((item) => item.id !== bookId));
  };

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header cart={cart} onRemoveFromCart={removeFromCart} />

      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link
                to="/#blog"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon name="ArrowLeft" size={16} />
                Вернуться к блогу
              </Link>
            </div>

            <article>
              <div className="mb-6">
                <Badge variant="secondary" className="mb-4">
                  {post.category}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={16} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="User" size={16} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={16} />
                    <span>{post.readTime} мин чтения</span>
                  </div>
                </div>
              </div>

              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg mb-8"
              />

              <div className="flex gap-3 mb-8">
                <Button variant="outline" size="sm">
                  <Icon name="Share2" size={16} className="mr-2" />
                  Поделиться
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Bookmark" size={16} className="mr-2" />
                  Сохранить
                </Button>
              </div>

              <Separator className="my-8" />

              <div
                className="prose prose-lg max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  lineHeight: '1.8',
                }}
              />

              <Separator className="my-8" />

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Icon name="ThumbsUp" size={16} className="mr-2" />
                    Полезно (24)
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    Комментарии (8)
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  <Icon name="Flag" size={16} className="mr-2" />
                  Пожаловаться
                </Button>
              </div>
            </article>

            <Card className="my-12 bg-gradient-to-br from-primary/5 to-secondary/10">
              <CardContent className="pt-6">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="User" size={32} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Об авторе</h3>
                    <p className="text-lg font-semibold mb-2">{post.author}</p>
                    <p className="text-muted-foreground">
                      Автор более 50 статей о православии, духовной литературе и традициях
                      Церкви. Регулярно выступает с лекциями в православных учебных заведениях.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {relatedPosts.length > 0 && (
              <section className="my-12">
                <h2 className="text-3xl font-bold mb-8">Читайте также</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
                      <Card className="hover:shadow-lg transition-all duration-300 hover-scale h-full">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-48 object-cover"
                        />
                        <CardContent className="pt-4">
                          <Badge variant="outline" className="mb-2 text-xs">
                            {relatedPost.category}
                          </Badge>
                          <div className="text-xs text-muted-foreground mb-2">
                            {relatedPost.date}
                          </div>
                          <h3 className="font-semibold mb-2 line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {relatedPost.preview}
                          </p>
                          <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                            <Icon name="Clock" size={14} />
                            <span>{relatedPost.readTime} мин</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <Card className="my-12">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4">Оставьте комментарий</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Введите имя"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Комментарий</label>
                    <textarea
                      placeholder="Напишите ваш комментарий..."
                      rows={5}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <Button>Отправить комментарий</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;
