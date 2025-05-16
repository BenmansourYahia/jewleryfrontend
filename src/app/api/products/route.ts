import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { searchParams } = new URL(request.url);
    
    let query = supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `);

    // Apply filters if provided
    const category = searchParams.get('category');
    if (category) {
      query = query.eq('categories.slug', category);
    }

    const minPrice = searchParams.get('minPrice');
    if (minPrice) {
      query = query.gte('price', parseFloat(minPrice));
    }

    const maxPrice = searchParams.get('maxPrice');
    if (maxPrice) {
      query = query.lte('price', parseFloat(maxPrice));
    }

    const search = searchParams.get('search');
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data: products, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const json = await request.json();

    const { data: product, error } = await supabase
      .from('products')
      .insert([json])
      .select(`
        *,
        category:categories(*)
      `)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}