#include <iostream>
using namespace std;

void Printstar(int star)
{
  if(star>0)
  {
    cout<<"*";
    Printstar(star-1);
  }
  else
  {
    return;
  }
}

void print (int number)
{
  if(number>0)
  {
    Printstar(number);
    cout<<endl;
    print(number-1);
    Printstar(number);
    cout<<endl;
  }
  else
  {
    return;
  }
}

int main()
{
  int i;
  for (i=4;i>0;i--)
  {
    for(int y=i;y>0;y--)
    {
      cout<<"*";  
    }
    cout<<endl;
  }
  for (i;i<4;i++)
  {
    for(int y=i;y>=0;y--)
    {
      cout<<"*";  
    }
    cout<<endl;
  }
  
  cout<<"++++++++++++++++++++++"<<endl;
  
  print(4);
}
    
#include <iostream>
using namespace std;

int main() {
for (int i=0;i<5;i++)
{
  for (int y=4;y>i;y--)
  {
    cout<<" ";
  }
  for (int z=i+1;z>0;z--)
  {
    cout<<"*";
  }
  for (int z=i+1;z>0;z--)
  {
    cout<<"*";
  }
  cout<<endl;
}

for (int i=5;i>0;i--)
{
  for (int y=5;y>i;y--)
  {
    cout<<" ";
  }
  for (int z=i;z>0;z--)
  {
    cout<<"*";
  }
  for (int z=i;z>0;z--)
  {
    cout<<"*";
  }
  cout<<endl;
}

  return 0;
}


#include <iostream>
using namespace std;

int main() {
  for (int i=0;i<5;i++)
  {
    for (int n=0;n<5;n++)
    {
      for (int y=i+1;y>0;y--)
    {
      cout<<"*";
    }
    for (int z=4;z>i;z--)
    {
      cout<<" ";
    }
    }
    
    cout<<endl;
  }


  return 0;
}