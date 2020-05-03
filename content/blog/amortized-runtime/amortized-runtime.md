# Amortized runtime

Usually, we calculate runtime by the number of operations done to complete or get a solution. In amortized it is a bit different where we calculate the time complexity by computing the average run time over a series of operations with varying run times.

The best example is inserting an element into an unbound ArrayList. In this case, inserting into an ArrayList has two different operations that can happen. One is the insertion and the other is the expansion of array. Insertion is considered as cheap operation and expansion is considered as an expensive operation since insertion takes O(1) time and expansion takes O(n) time to copy current elements to the new, bigger array and O(1) time to insert a new element.

But in this case, we cannot say that insertion in the worst case is O(n) because that is amortized or happens less frequently than the number of cheap operations.

So, in this case, we calculate the amortized time by taking the average of the total cost of all operation with the total number of operation

> total cost of all operations / total number of operations

So with the above example, to insert a six elements into an array list of size 5 will be

insert element 1 → O(1)

insert element 2 → O(1)

insert element 3 → O(1)

insert element 4 → O(1)

insert element 5 → O(1)

insert element 6 → O(N) + O(1)

For the sixth element, it takes O(N) cost to copy previous N elements into a bigger array and then insert a new element which costs O(1)

If we continue this, the next expensive operation of copying will occur after 4 cheap operations since the current size of ArrayList will be 10 as we double array size.  

insert element 1 → O(1)

insert element 2 → O(1)

insert element 3 → O(1)

insert element 4 → O(1)

insert element 5 → O(1)

insert element 6 → O(N) + O(1)

insert element 7 → O(1)

insert element 8 → O(1)

insert element 9 → O(1)

insert element 10 → O(1)

insert element 11 → O(N) + O(1)

After this the will be nine cheap operations before the next expensive operation and this patter continues as 5, 4, 9, 19...

So now to calculate the amortized run time,

total cost / total operations → N cheap operations * O(1) cost + 1 expensive operation * O(N) cost / N + 1 total operations

~ O(N) / N

~ O(1)

Now if we don't double the size of the array every time the array is full but increase its size by a constant size say 3, then the amortized time will be different as bellow.

insert element 1 → O(1)

insert element 2 → O(1)

insert element 3 → O(1)

insert element 4 → O(1)

insert element 5 → O(1)

insert element 6 → O(N) + O(1)

insert element 7 → O(1)

insert element 8 → O(1)

insert element 9 → O(N) + O(1)

insert element 10 → O(1)

insert element 11 → O(1)

insert element 12 → O(N) + O(1)

if we calculate amortized time for this,

2 * cheap operation of O(1) + 1 * expensive operation of O(N) / 2 + 1 toal operations

~ O(N)/3

~ O(N) which is runtime for non amortized expansion. 

> The intuition is when amortized expansion happens, one expensive operation of cost O(N) happens after every N operations of O(1) so, that expensive operation can be dividing equally between each N operations which brings down that expensive operation to O(1) on whole. But that is not the case when it is not amortized. Each cheap operation takes a bigger part of the expensive operation.