
"use client";

import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Trash2 } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';

export default function CategoryListTable() {
  const { categories, deleteCategory, products } = useAppContext();
  const { toast } = useToast();

  const handleDeleteCategory = (categoryId: string) => {
    // The check for products using the category is now inside AppContext's deleteCategory
    deleteCategory(categoryId);
  };

  if (!categories || categories.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No categories found. Add some to get started!</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead className="text-center">Products Count</TableHead>
          <TableHead className="text-right w-[150px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => {
          const productCount = products.filter(p => p.category.id === category.id).length;
          return (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.slug}</TableCell>
              <TableCell className="text-center">{productCount}</TableCell>
              <TableCell className="text-right">
                <Link href={`/admin/categories/edit/${category.id}`} passHref>
                  <Button variant="ghost" size="icon" title="Edit Category">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title="Delete Category"
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the category "{category.name}".
                        {productCount > 0 && <span className="block mt-2 font-semibold text-destructive">This category is used by {productCount} product(s). Deletion is prevented.</span>}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDeleteCategory(category.id)}
                        disabled={productCount > 0} 
                        className={productCount > 0 ? "bg-destructive/50 hover:bg-destructive/50" : "bg-destructive hover:bg-destructive/90"}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

    