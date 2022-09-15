# # # phoneNumber = '9625783624';

# # # isCorrect = phoneNumber.isdigit();

# # # print('does phoneNumber contains all the number ->', isCorrect);

# # pinCode = '201009'

# # isCorrectPinCode = pinCode.isdigit();

# # print('does pinCode contains all the number ->', isCorrectPinCode);

# firstString = 'qwertyuio';

# print('first string ->', firstString.isdigit());

# secondString = '234yu34yu34'

# print('second string -> ', secondString.isdigit());

# thirdString = '4567-765'

# print('third string -> ', thirdString.isdigit());

# fourthString = '751142114852141'

# print('fourth string -> ', fourthString.isdigit())

nums = [-1,0,1,2,-1,-4]
result = ['helo']
nums.sort()
i = 0
while i < len(nums) - 2:
    print(i)
    if(i == 0 or nums[i] != nums[i-1]):
        j = i+1
        k = len(nums) - 1
        while j < k:
            if(nums[i] +  nums[j] + nums[k] < 0):
                j += 1
            elif(nums[i] + nums[j] + nums[k] > 0):
                k -= 1
            else:
                result.append([nums[i], nums[j], nums[k]])
                j += 1
                k -= 1
                while(j < k and nums[j] == nums[j-1]):
                    j += 1
                while(j < k and nums[k] == nums[k+1]):
                    k -= 1
    i += 1
    # else:
        
print(result)